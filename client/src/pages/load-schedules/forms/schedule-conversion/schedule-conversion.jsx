import React, { useEffect, useState, Fragment } from 'react';

import { EditOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';

import { Form, Button, Card, Tabs, Modal, notification, Drawer, Row, Col, InputNumber } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';

import { Supplier, Carrier, Tanker } from '../fields';

import { SETTINGS } from '../../../../constants';
import { LOAD_SCHEDULES, TANKER_LIST } from '../../../../api';

import Products from './products';
import Compartments from './compartments';

const TabPane = Tabs.TabPane;

const ScheduleConversion = ({
  value,
  visible,
  handleFormState,
  access,
  customer,
  config,
  onCompleteParent,
}) => {
  const { site_customer_product, site_customer_carrier, siteSchdTypeConvertible } = config;

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const drawerWidth = '80vw';

  const [supplier, setSupplier] = useState(undefined);
  const [carrier, setCarrier] = useState(undefined);
  const [tanker, setTanker] = useState(undefined);
  const [activeTrips, setActiveTrips] = useState(0);
  const [products, setProducts] = useState([]);

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */
  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const { data: productsPayload } = useSWR(
    value
      ? `${LOAD_SCHEDULES.PRODUCTS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`
      : null
  );

  const { data: trips } = useSWR(`${TANKER_LIST.CHECK_TANKER_ACTIVE_TRIPS}?tanker=${tanker}`, {
    refreshInterval: 0,
  });

  const { resetFields, setFieldsValue } = form;

  const validateTripNumber = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.tripNumber')}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthTripNum) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthTripNum} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const onFormClosed = () => {
    handleFormState(false, null);
  };

  const onComplete = (value) => {
    handleFormState(false, null);
    onCompleteParent(value);
  };

  const changeSupplier = (supplier) => {
    setSupplier(supplier);
  };

  const getTankerCompartments = async (tanker) => {
    const results = await api.get(`${LOAD_SCHEDULES.COMPARTMENTS_BY_TANKER}?tnkr_code=${tanker}`);

    const cmpts = results?.data?.records;
    const units = [];
    if (cmpts) {
      _.forEach(cmpts, (o) => {
        const unit = {};
        unit.compartment = o?.compartment;
        unit.unit_code = o?.unit_code;
        unit.unit_name = o?.unit_name;
        units.push(unit);
      });
    }

    return units;
  };

  const checkCompartmentUnits = (compartments, cmptUnits) => {
    const errors = [];

    if (cmptUnits.length === 0) {
      return errors;
    }

    _.forEach(compartments, (cmpt) => {
      const cunit = _.find(cmptUnits, (o) => o?.compartment === cmpt?.compartment);

      if (!cunit) {
        // do nothing
      } else {
        if (String(cunit?.unit_code) !== String(cmpt?.unit_code)) {
          let title = t('descriptions.schdCmptUnitNotMatchTnkrCmpt');
          title = title.replace('[[SCHD_UNIT]]', '"' + cmpt?.unit_name + '"');
          title = title.replace('[[TNKR_UNIT]]', '"' + cunit?.unit_name + '"');
          errors.push({
            field: `${t('fields.unit')} (${t('fields.compartment')} ${cmpt?.compartment})`,
            message: title,
            key: `${'compartment'}${cmpt?.compartment}`,
            line: cmpt?.compartment,
          });
        }
      }
    });

    return errors;
  };

  const checkQuantities = (compartments, products) => {
    const errors = [];

    _.forEach(products, (product) => {
      const ordered = product?.qty_scheduled;
      const planned = _.sumBy(
        compartments.filter((o) => o?.prod_code === product?.prod_code),
        'qty_scheduled'
      );

      let customTitles = '';
      if (planned < ordered) {
        customTitles = t('validate.quantityCompartmentsLessThanProduct');
        customTitles = customTitles.replace(
          '[[PRODUCT]]',
          '"' + product?.prod_code + ' - ' + product?.prod_name + '"'
        );
        errors.push({
          field: `${product?.prod_code} - ${product?.prod_name}: ${t('fields.totalQtyCmpt')} ${planned} < ${t(
            'fields.totalQtyProd'
          )} ${ordered} ${product?.unit_name}`,
          message: customTitles,
          key: `${'quantity'}${product?.prod_code}`,
          line: errors.length,
        });
      }

      if (planned > ordered) {
        customTitles = t('validate.quantityCompartmentsMoreThanProduct');
        customTitles = customTitles.replace(
          '[[PRODUCT]]',
          '"' + product?.prod_code + ' - ' + product?.prod_name + '"'
        );
        errors.push({
          field: `${product?.prod_code} - ${product?.prod_name}: ${t('fields.totalQtyCmpt')} ${planned} > ${t(
            'fields.totalQtyProd'
          )} ${ordered} ${product?.unit_name}`,
          message: customTitles,
          key: `${'quantity'}${product?.prod_code}`,
          line: errors.length,
        });
      }
    });

    return errors;
  };

  const onConvertSchedule = async () => {
    const record = await form.validateFields();

    let findResult = _.find(record.compartments, (item) => {
      return item.prod_code !== '';
    });

    if (!findResult) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.prescheduleReady'),
      });
      return;
    }

    findResult = _.find(record.compartments, (item) => {
      return item.qty_scheduled > 0 && (item.unit_code === '' || !item.unit_code);
    });

    if (findResult) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.preSchedProdUnit', { CMPT: findResult.compartment }),
      });
      return;
    }

    findResult = _.find(record.compartments, (item) => {
      return item.qty_scheduled > 0 && (item.prod_code === '' || !item.prod_code);
    });

    if (findResult) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.preSchedProd', { CMPT: findResult.compartment }),
      });
      return;
    }

    record.shls_ld_type = 2;
    const values = {
      ...record,
      shls_terminal: value?.shls_terminal,
      drawer_code: value?.drawer_code,
    };

    const cmptUnits = await getTankerCompartments(record?.tnkr_code);
    // check the compartment units
    const unitErrors = checkCompartmentUnits(record.compartments, cmptUnits);

    // check the quantities
    let errors = [];
    let lines = null;
    errors = checkQuantities(record.compartments, products);
    errors = _.concat(errors, unitErrors);
    if (errors.length > 0) {
      lines = (
        <Scrollbars
          style={{
            height: '300px',
            width: '40vw',
            marginTop: 15,
            padding: 5,
            marginBottom: 15,
          }}
        >
          <>
            {errors?.map((error, index) => (
              <Card key={index} size="small" title={error.field}>
                {error.message}
              </Card>
            ))}
          </>
        </Scrollbars>
      );
    }

    let submitPrompt = t('prompts.confirmConvertSchedule');
    if (errors.length > 0) {
      submitPrompt += ' (' + String(errors.length) + ' ' + t('validate.warnings') + ')';
    }

    Modal.confirm({
      title: submitPrompt,
      okText: t('operations.convert'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      width: errors.length > 0 ? '45vw' : '30vw',
      content: lines,
      onOk: async () => {
        await api
          .post(LOAD_SCHEDULES.CONVERT_SCHEDULE, values)
          .then(() => {
            notification.success({
              message: t('messages.convertSuccessSchedule'),
              description: t('descriptions.convertSuccessSchedule'),
            });
            onComplete(values);
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.code === 500 ? t('messages.convertFailedSchedule') : error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_trip_no: value?.shls_trip_no,
      });
    }
  }, [setFieldsValue, value]);

  useEffect(() => {
    if (!value && !visible) {
      setSupplier(undefined);
      setCarrier(undefined);
      setTanker(undefined);

      resetFields();
    }
  }, [resetFields, setFieldsValue, visible, value]);

  useEffect(() => {
    if (trips) {
      const count = trips?.records?.[0]?.cnt;
      if (value?.status === 'A' || value?.status === 'L') {
        setActiveTrips(count - 1);
      } else {
        setActiveTrips(count);
      }
    }
  }, [trips]);

  useEffect(() => {
    if (value && productsPayload) {
      const filterProducts = _.filter(productsPayload.records, (o) => o?.qty_scheduled > 0);
      setProducts(filterProducts);
      setFieldsValue({
        products: filterProducts,
      });
    }
  }, [value, productsPayload, setFieldsValue]);

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={() => onFormClosed()}
      maskClosable={false}
      mask={true}
      destroyOnClose
      placement="right"
      width={drawerWidth}
      open={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onFormClosed()}
          >
            {t('operations.cancel')}
          </Button>

          {siteSchdTypeConvertible && value?.shls_ld_type === '3' && value?.status === 'F' && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={onConvertSchedule}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canUpdate}
            >
              {t('operations.convertPreSchedule')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab={t('tabColumns.convertSchedule')} key="1">
            <Row gutter={[8, 4]}>
              <Col span={12}>
                <Supplier form={form} value={value} onChange={changeSupplier} />
              </Col>
              <Col span={12}>
                <Form.Item
                  name="shls_trip_no"
                  label={t('fields.tripNumber')}
                  rules={[{ required: true, validator: validateTripNumber }]}
                >
                  <InputNumber min={1} style={{ width: '100%' }} disabled={!supplier || !!value} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[8, 4]}>
              <Col span={12}>
                <Carrier
                  form={form}
                  customer={site_customer_carrier ? customer : undefined}
                  value={value}
                  onChange={setCarrier}
                />
              </Col>

              <Col span={12}>
                <Tanker
                  form={form}
                  value={value}
                  carrier={carrier}
                  onChange={setTanker}
                  activeTrips={activeTrips}
                />
              </Col>
            </Row>

            <Row gutter={[8, 16]}>
              <Col span={24}>
                <Products form={form} value={value} products={products} units={units} />
              </Col>
            </Row>

            <Row gutter={[8, 4]}>
              <Col span={24}>
                <Compartments
                  form={form}
                  value={value}
                  drawer={value ? value.supplier_code : supplier} //Same as v9, when supplier != drawer, use supplier product
                  tanker={!tanker ? value?.tnkr_code : tanker}
                  supplier={value ? value.supplier_code : supplier}
                  customer={site_customer_product ? customer : undefined}
                  config={config}
                  products={products}
                  units={units}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default ScheduleConversion;
