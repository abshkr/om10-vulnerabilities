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
  const [transactionCreated, setTransactionCreated] = useState(0);
  const [ownershipCreated, setOwnershipCreated] = useState(0);
  const [ownershipUpdated, setOwnershipUpdated] = useState(0);

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

  const getOwnership = async (prod, supp) => {
    const results = await api.get(`${BASE_OWNERS.READ}?base_code=${prod}&cmpy_code=${supp}`);

    return results?.data?.records;
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

  const updateBaseOwnership = async (vobj) => {
    const values = {};

    values.ownship_no = vobj?.ownship_no;
    values.base_prod_code = vobj?.base_prod_code;
    values.supp_cmpy = vobj?.supp_cmpy;
    values.ownship_qty = _.toNumber(vobj?.ownship_qty) + _.toNumber(vobj?.reason) * _.toNumber(vobj?.qty);
    values.ownship_unit = vobj?.ownship_unit;

    await api
      .post(BASE_OWNERS.UPDATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.updateSuccessOwnership');
        notes = notes.replace('[[BASE]]', '"' + vobj?.base_prod_code + '"');
        notes = notes.replace('[[SUPPLIER]]', '"' + vobj?.supp_cmpy + '"');

        notification.success({
          message: t('messages.updateSuccess'),
          description: notes,
        });

        setOwnershipUpdated(1);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        setOwnershipUpdated(-1);
      });
  };

  const createBaseOwnership = async (vobj) => {
    const values = {};

    values.ownship_no = -888888;
    values.base_prod_code = vobj?.base_prod_code;
    values.supp_cmpy = vobj?.supp_cmpy;
    values.ownship_qty = _.toNumber(vobj?.qty);
    values.ownship_unit = 11; // vobj?.ownship_unit;

    await api
      .post(BASE_OWNERS.CREATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.createSuccessBaseOwnership');
        notes = notes.replace('[[BASE]]', '"' + vobj?.base_prod_code + '"');
        notes = notes.replace('[[SUPPLIER]]', '"' + vobj?.supp_cmpy + '"');

        notification.success({
          message: t('messages.createSuccess'),
          description: notes,
        });

        setOwnershipCreated(1);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        setOwnershipCreated(-1);
      });
  };

  const createOwnershipTransaction = async (vobj) => {
    const values = vobj;

    await api
      .post(BASE_OWNER_TRANSACTIONS.CREATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.createSuccessOwnershipTransaction');
        notes = notes.replace('[[BASE]]', '"' + vobj?.base_prod_code + '"');
        notes = notes.replace('[[SUPPLIER]]', '"' + vobj?.supp_cmpy + '"');

        notification.success({
          message: t('messages.createSuccess'),
          description: notes,
        });

        setTransactionCreated(1);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        setTransactionCreated(-1);
      });
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (IS_CREATING) {
      values.ownship_trsa_no = -888888;
    }

    const owners = await getOwnership(values.base_prod_code, values.supp_cmpy);

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        if (IS_CREATING) {
          await createOwnershipTransaction(values);
          if (owners.length > 0) {
            values.ownship_no = owners?.[0]?.ownship_no;
            values.ownship_qty = owners?.[0]?.ownship_qty;
            values.ownship_unit = owners?.[0]?.ownship_unit;
            await updateBaseOwnership(values);
            // need this to trigger onComplete
            setOwnershipCreated(2);
          } else {
            await createBaseOwnership(values);
            // need this to trigger onComplete
            setOwnershipUpdated(2);
          }
        } else {
          await api
            .post(BASE_OWNER_TRANSACTIONS.UPDATE, values)
            .then(() => {
              onComplete();

              notification.success({
                message: t('messages.updateSuccess'),
                description: t('messages.updateSuccess'),
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
        }
      },
    });
  };

  const onFinishEdit = async () => {
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
    if (!selected) {
      resetFields();

      if (base) {
        setFieldsValue({
          base_prod_code: base,
        });
      }
      if (supplier) {
        setFieldsValue({
          supp_cmpy: supplier,
        });
      }
    }
  }, [resetFields, setFieldsValue, base, supplier, selected]);

  useEffect(() => {
    if (transactionCreated !== 0 && ownershipCreated !== 0 && ownershipUpdated !== 0) {
      onComplete();
      setTransactionCreated(0);
      setOwnershipCreated(0);
      setOwnershipUpdated(0);
    }
  }, [transactionCreated, ownershipCreated, ownershipUpdated]);

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
                    minValue: 0,
                    maxValue: 999999999,
                    maxLen: 20,
                  },
                ]}
              >
                <Input
                  type="number"
                  // disabled={!IS_CREATING}
                  style={{ width: '100%' }}
                  min={0}
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
