import React, { useEffect, useState, Fragment } from 'react';

import { EditOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';

import { Form, Button, Card, Tabs, Modal, notification, Drawer, Row, Col, InputNumber } from 'antd';

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
  url,
  locateTrip,
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
    if (input && len > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const onFormClosed = () => {
    handleFormState(false, null);
  };

  const onComplete = (value) => {
    handleFormState(false, null);
    /* if (value) {
      locateTrip(value);
    } else {
      mutate(url);
    } */
    onCompleteParent(value);
  };

  const changeSupplier = (supplier) => {
    setSupplier(supplier);
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
      return item.qty_scheduled > 0 && item.unit_code === '';
    });

    if (findResult) {
      notification.error({
        message: t('messages.validationFailed'),
        description: `${t('descriptions.preSchedProdUnit')} ${findResult.compartment} `,
      });
      return;
    }

    findResult = _.find(record.compartments, (item) => {
      return item.qty_scheduled > 0 && item.prod_code === '';
    });

    if (findResult) {
      notification.error({
        message: t('messages.validationFailed'),
        description: `${t('descriptions.preSchedProd')} ${findResult.compartment} `,
      });
      return;
    }

    record.shls_ld_type = 2;

    const values = {
      ...record,
    };

    Modal.confirm({
      title: t('prompts.confirmConvertSchedule'),
      okText: t('operations.convert'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
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
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => onFormClosed()}
      maskClosable={false}
      mask={true}
      destroyOnClose
      placement="right"
      width={drawerWidth}
      visible={visible}
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
