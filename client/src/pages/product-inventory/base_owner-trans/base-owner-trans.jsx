import React, { useState, useEffect } from 'react';

import {
  Card,
  Button,
  Drawer,
  Modal,
  Form,
  Tabs,
  Input,
  Select,
  notification,
  Row,
  Col,
  Descriptions,
} from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../components';
import api, { BASE_OWNERS, BASE_OWNER_TRANSACTIONS } from '../../../api';
import columns from './columns';

const { TabPane } = Tabs;

const BaseOwnerTransactions = ({ baseCode, suppCode, bases, suppliers, value, access, config }) => {
  const [base, setBase] = useState(baseCode || value?.base_prod_code);
  const [supplier, setSupplier] = useState(suppCode || value?.supp_cmpy);

  const url = `${BASE_OWNER_TRANSACTIONS.READ}?base_code=${base || '-1'}&cmpy_code=${supplier || '-1'}`;

  const { data } = useSWR(url);

  // const { data: types } = useSWR(BASE_OWNER_TRANSACTIONS.REASONS);

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const IS_CREATING = !selected;
  const percentPrecision = 4;

  const { resetFields, setFieldsValue, getFieldsValue } = form;

  const reasons = [
    {
      reason_id: 1,
      reason_text: t('operations.increase'),
    },
    {
      reason_id: -1,
      reason_text: t('operations.decrease'),
    },
  ];

  const fields = columns(t, reasons);

  // Find if the owner has the ownership in the current tank
  // and the existing owner will be disabled in owner list when adding new ownership
  const isOwnerFound = (list, item) => {
    const ownership = _.find(list, (o) => o.supp_cmpy === item.cmpy_code);
    if (!ownership) {
      return false;
    } else {
      return true;
    }
  };

  const handleFormState = (visibility, value) => {
    if (!visibility) {
      setFieldsValue({
        supp_cmpy: null,
        base_prod_code: null,
        qty: null,
        reason: null,
      });
    }
    setSelected(value);
    setVisible(visibility);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(url);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (IS_CREATING) {
      values.ownship_trsa_no = -888888;
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? BASE_OWNER_TRANSACTIONS.CREATE : BASE_OWNER_TRANSACTIONS.UPDATE, values)
          .then(() => {
            onComplete();

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(BASE_OWNER_TRANSACTIONS.DELETE, selected)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const validateInput = (rule, input) => {
    const min = rule?.minValue || 0;
    const max = rule?.maxValue || 999999999;
    const limit = rule?.maxLen || 256;
    console.log('.............rule', rule);

    if (rule?.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    if (input && _.toNumber(input) < min) {
      return Promise.reject(`${t('placeholder.minNumber')}: ${min} ─ ${t('descriptions.minNumber')}`);
    }

    if (input && _.toNumber(input) > max) {
      return Promise.reject(`${t('placeholder.maxNumber')}: ${max} ─ ${t('descriptions.maxNumber')}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const validateList = (rule, input) => {
    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    return Promise.resolve();
  };

  const getQtyPercentage = (cmpy, proportion) => {
    // get Total Qty of the tank excluding the current company
    const totalQty = _.sumBy(data?.records, (o) => {
      if (o.base_prod_code === base && o.tklink_tankdepo === supplier && o.supp_cmpy !== cmpy) {
        return o.qty;
      } else {
        return 0;
      }
    });
    // get Qty Percentage
    const sumQty = totalQty + proportion;
    // console.log('.............getQtyPercent', cmpy, proportion, totalQty, sumQty);
    const percentage = (proportion / sumQty) * 100;

    return percentage;
  };

  const handleQtyProportionFieldChange = (v) => {
    const values = getFieldsValue(['supp_cmpy', 'tko_percentage', 'qty', 'tko_std_ltr', 'tko_kg']);

    // get Qty Proportion
    const proportion =
      v?.target?.value === '' || v?.target?.value === undefined ? 0 : _.toNumber(v?.target?.value);
    // const proportion = values?.qty === '' || values?.qty === undefined ? 0 : values?.qty;
    // get Standard Volume
    const stdVol = proportion;
    // get Mass Qty
    const massQty = value?.tank_density * (stdVol / 1000);
    // get Qty Percentage
    const percentage = getQtyPercentage(values?.supp_cmpy, proportion);
    // const isAdtv = value?.tank_base_class === '6' || value?.tank_base_class === '11';
    // const precision = isAdtv ? config?.precisionAdditive : config?.precisionVolume;
    const precision = config?.precisionVolume;
    // setFieldsValue({ qty: _.round(proportion, precision) });
    setFieldsValue({ tko_std_ltr: _.round(stdVol, precision) });
    setFieldsValue({ tko_kg: _.round(massQty, precision) });
    setFieldsValue({ tko_percentage: _.round(percentage, percentPrecision) });
  };

  const handleStdVolFieldChange = async (v) => {
    const values = getFieldsValue(['supp_cmpy', 'tko_percentage', 'qty', 'tko_std_ltr', 'tko_kg']);

    // get Standard Volume
    const stdVol =
      v?.target?.value === '' || v?.target?.value === undefined ? 0 : _.toNumber(v?.target?.value);
    // const stdVol = values?.tko_std_ltr === '' || values?.tko_std_ltr === undefined ? 0 : values?.tko_std_ltr;
    // get Qty Proportion
    const proportion = stdVol;
    // get Mass Qty
    const massQty = value?.tank_density * (stdVol / 1000);
    // get Qty Percentage
    const percentage = getQtyPercentage(values?.supp_cmpy, proportion);
    // const isAdtv = value?.tank_base_class === '6' || value?.tank_base_class === '11';
    // const precision = isAdtv ? config?.precisionAdditive : config?.precisionVolume;
    const precision = config?.precisionVolume;
    setFieldsValue({ qty: _.round(proportion, precision) });
    // setFieldsValue({ tko_std_ltr: _.round(stdVol, precision) });
    setFieldsValue({ tko_kg: _.round(massQty, precision) });
    setFieldsValue({ tko_percentage: _.round(percentage, percentPrecision) });
  };

  const handleMassQtyFieldChange = async (v) => {
    const values = getFieldsValue(['supp_cmpy', 'tko_percentage', 'qty', 'tko_std_ltr', 'tko_kg']);

    // get Mass Qty
    const massQty =
      v?.target?.value === '' || v?.target?.value === undefined ? 0 : _.toNumber(v?.target?.value);
    // const massQty = values?.tko_kg === '' || values?.tko_kg === undefined ? 0 : values?.tko_kg;
    // get Standard Volume
    const stdVol = (massQty / value?.tank_density) * 1000;
    // get Qty Proportion
    const proportion = stdVol;
    // get Qty Percentage
    const percentage = getQtyPercentage(values?.supp_cmpy, proportion);
    // const isAdtv = value?.tank_base_class === '6' || value?.tank_base_class === '11';
    // const precision = isAdtv ? config?.precisionAdditive : config?.precisionVolume;
    const precision = config?.precisionVolume;
    setFieldsValue({ qty: _.round(proportion, precision) });
    setFieldsValue({ tko_std_ltr: _.round(stdVol, precision) });
    // setFieldsValue({ tko_kg: _.round(massQty, precision) });
    setFieldsValue({ tko_percentage: _.round(percentage, percentPrecision) });
  };

  const modifiers = (
    <>
      <Button
        type="primary"
        style={{ float: 'right' }}
        disabled={!access.canCreate}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.makeTransaction')}
      </Button>
    </>
  );

  useEffect(() => {
    console.log('....................trans', baseCode, suppCode, value);
    if (value) {
      setBase(value?.base_prod_code);
      setSupplier(value?.supp_cmpy);
    } else {
      if (baseCode) {
        setBase(baseCode);
      }
      if (suppCode) {
        setSupplier(suppCode);
      }
    }
  }, [value, baseCode, suppCode]);

  useEffect(() => {
    if (base && supplier && !selected) {
      resetFields();

      setFieldsValue({
        base_prod_code: base,
        supp_cmpy: supplier,
      });
    }
  }, [resetFields, setFieldsValue, base, supplier, selected]);

  useEffect(() => {
    if (selected) {
      resetFields();
      setFieldsValue({
        base_prod_code: selected?.base_prod_code,
        supp_cmpy: selected?.supp_cmpy,
        reason: selected?.reason,
        qty: selected?.qty,
        ownship_trsa_no: selected?.ownship_trsa_no,
      });
    } else {
    }
  }, [resetFields, selected]);

  return (
    <>
      <Card hoverable>
        <Row gutter={[2, 12]}>
          <Col span={24}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }}>
              <Descriptions.Item label={t('fields.baseProduct')} span={24}>
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue={base}
                  value={base}
                  onChange={setBase}
                  showSearch
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectBaseProduct')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {bases?.records?.map((item) => {
                    return (
                      <Select.Option key={item.base_code} value={item.base_code}>
                        {item.base_desc}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.supplier')} span={24}>
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue={supplier}
                  value={supplier}
                  onChange={setSupplier}
                  showSearch
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectSupplier')}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {suppliers?.records?.map((item) => {
                    return (
                      <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
                        {item.cmpy_desc}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div>{modifiers}</div>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={true}
              columns={fields}
              data={data?.records}
              parentHeight={'calc(100vh - 360px)'}
              onClick={(payload) => handleFormState(true, payload)}
              handleSelect={(payload) => handleFormState(true, payload[0])}
            />
          </Col>
        </Row>
      </Card>

      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        onClose={() => handleFormState(false, null)}
        maskClosable={IS_CREATING}
        destroyOnClose={true}
        mask={IS_CREATING}
        placement="right"
        width="30vw"
        visible={visible}
        footer={
          <>
            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              style={{ float: 'right' }}
              onClick={() => handleFormState(false, null)}
            >
              {t('operations.cancel')}
            </Button>

            <Button
              type="primary"
              icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
              htmlType="submit"
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
              disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>

            {!IS_CREATING && (
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!access?.canDelete}
              >
                {t('operations.delete')}
              </Button>
            )}
          </>
        }
      >
        <Form layout="vertical" form={form} scrollToFirstError>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('tabColumns.general')} key="1">
              <Form.Item
                name="ownship_trsa_no"
                label={t('fields.baseOwnerTransNo')}
                rules={[{ required: false }]}
              >
                <Input disabled={true} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="base_prod_code"
                label={t('fields.baseProduct')}
                rules={[{ required: true, validator: validateList, label: t('fields.baseProduct') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue={base}
                  // value={base}
                  // onChange={setBase}
                  showSearch
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectBaseProduct')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {bases?.records?.map((item) => {
                    return (
                      <Select.Option key={item.base_code} value={item.base_code}>
                        {item.base_desc}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="supp_cmpy"
                label={t('fields.supplier')}
                rules={[{ required: true, validator: validateList, label: t('fields.supplier') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue={supplier}
                  // value={supplier}
                  // onChange={setSupplier}
                  showSearch
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectSupplier')}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {suppliers?.records?.map((item) => {
                    return (
                      <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
                        {item.cmpy_desc}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="reason"
                label={t('fields.baseOwnerTransReason')}
                rules={[{ required: true, validator: validateList, label: t('fields.baseOwnerTransReason') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  showSearch
                  disabled={false}
                  // onChange={handleChange}
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectOwnershipTransReason')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {reasons.map((item, index) => (
                    <Select.Option key={index} value={_.toNumber(item.reason_id)}>
                      {item.reason_text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="qty"
                label={t('fields.baseOwnerTransQuantity')}
                rules={[
                  {
                    required: true,
                    validator: validateInput,
                    label: t('fields.baseOwnerTransQuantity'),
                    minValue: -999999999,
                    maxValue: 999999999,
                    maxLen: 20,
                  },
                ]}
              >
                <Input
                  type="number"
                  // disabled={!IS_CREATING}
                  style={{ width: '100%' }}
                  min={-999999999}
                  max={999999999}
                  precision={config?.precisionVolume}
                  addonAfter={!value ? t('units.lcor') : value?.description}
                  // onChange={handleQtyProportionFieldChange}
                />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default BaseOwnerTransactions;
