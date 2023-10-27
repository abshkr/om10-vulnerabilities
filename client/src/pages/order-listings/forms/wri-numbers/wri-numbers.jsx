import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import {
  Card,
  Checkbox,
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
  LockOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { WRI } from '../../../../api';
import { SETTINGS } from '../../../../constants';
import columns from './columns';
import EffectiveFrom from './effective-from';
import ExpiredAfter from './expired-after';

const { TabPane } = Tabs;

const WriNumbers = ({ value, access, config, listing }) => {
  const { t, i18n } = useTranslation();

  const [records, setRecords] = useState([]);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const url = `${WRI.READ}`;

  const { data: payload } = useSWR(url);
  const { data: idStats } = useSWR(WRI.WRI_ID_STATS);
  const { data: statusTypes } = useSWR(WRI.WRI_STATUS_TYPES);
  const { data: tankers, isValidating } = useSWR(WRI.TANKERS);

  const lang3 = { en: 'ENG', cn: 'CHN' };

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(0);

  const IS_CREATING = !selected;

  const { resetFields, setFieldsValue, getFieldValue } = form;

  const fields = columns(t, listing);

  const handleFormState = (visibility, selection) => {
    if (!visibility) {
      setFieldsValue({
        wri_number: null,
        id_status: 2,
        producer_name: null,
        pickup_location: null,
        waste_classification: null,
        vehicle_registration: null,
        contract_number: value?.order_sys_no,
        // wri_effective_date: null,
        // wri_expiry_date: null,
        wri_status: 0,
      });
      setStatus(0);
    }
    setSelected(selection);
    setVisible(visibility);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(url);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (!values?.contract_number) {
      values.contract_number = value?.order_sys_no;
    }
    if (values?.wri_status === undefined || values?.wri_status === null) {
      values.wri_status = 0;
    }

    // console.log('.....................values.wri_effective_date', values.wri_effective_date);
    // console.log('.....................values.wri_expiry_date', values.wri_expiry_date);
    if (!values?.wri_effective_date) {
      values.wri_effective_date = '';
    } else {
      values.wri_effective_date = values.wri_effective_date?.format(SETTINGS.DATE_TIME_FORMAT);
    }
    if (!values?.wri_expiry_date) {
      values.wri_expiry_date = '';
    } else {
      values.wri_expiry_date = values.wri_expiry_date?.format(SETTINGS.DATE_TIME_FORMAT);
    }
    // console.log('.....................values.wri_effective_date2', values.wri_effective_date);
    // console.log('.....................values.wri_expiry_date2', values.wri_expiry_date);

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? WRI.CREATE : WRI.UPDATE, values)
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
                message:
                  error.code === 400 || error.code === 500
                    ? IS_CREATING
                      ? t('messages.createFailed')
                      : t('messages.updateFailed')
                    : error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onDelete = async () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(WRI.DELETE, selected)
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
                // message: error.type,
                message: error.code === 500 ? t('messages.deleteFailed') : error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const validateField = (rule, input) => {
    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (rule.maxLength !== undefined && rule.maxLength !== null && input && len > rule.maxLength) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${rule.maxLength} ─ ${t('descriptions.maxCharacters')}`
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
        {t('operations.wriAdd')}
      </Button>
      {/* <Button
        type="danger"
        style={{ float: 'right' }}
        disabled={!access.canDelete}
        // onClick={() => handleFormState(true, null)}
      >
        {t('operations.wriDelete')}
      </Button> */}
    </>
  );

  useEffect(() => {
    if (payload) {
      setRecords(payload?.records);
    }
  }, [payload]);

  useEffect(() => {
    if (selected) {
      resetFields();
      setFieldsValue({
        wri_number: selected?.wri_number,
        id_status: selected?.id_status,
        producer_name: selected?.producer_name,
        pickup_location: selected?.pickup_location,
        waste_classification: selected?.waste_classification,
        vehicle_registration: selected?.vehicle_registration,
        contract_number: selected?.contract_number,
        // wri_effective_date: selected?.wri_effective_date,
        // wri_expiry_date: selected?.wri_expiry_date,
        wri_status: selected?.wri_status,
      });
      setStatus(selected?.wri_status);
    } else {
      resetFields();
      setFieldsValue({
        wri_number: null,
        id_status: 2,
        producer_name: null,
        pickup_location: null,
        waste_classification: null,
        vehicle_registration: null,
        contract_number: value?.order_sys_no,
        // wri_effective_date: null,
        // wri_expiry_date: null,
        wri_status: 0,
      });
      setStatus(0);
    }
  }, [resetFields, setFieldsValue, selected]);

  return (
    <>
      <Card hoverable>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={false}
              columns={fields}
              data={records}
              extra={modifiers}
              parentHeight="70vh"
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
        width="40vw"
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
                disabled={!access?.canDelete || status === 1}
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
                name="wri_number"
                label={t('fields.wriNumber')}
                rules={[
                  { required: true, validator: validateField, label: t('fields.wriNumber'), maxLength: 20 },
                ]}
              >
                <Input disabled={!IS_CREATING} />
              </Form.Item>

              {listing && (
                <Form.Item
                  name="id_status"
                  label={t('fields.wriIdStatus')}
                  rules={[{ required: true, validator: validateList, label: t('fields.wriIdStatus') }]}
                >
                  <Select
                    dropdownMatchSelectWidth={false}
                    allowClear
                    // loading={isValidating}
                    showSearch
                    disabled={false}
                    // onChange={onChange}
                    optionFilterProp="children"
                    placeholder={t('placeholder.selectWriIdStatus')}
                    filterOption={(value, option) =>
                      option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                    }
                  >
                    {idStats?.records?.map((item, index) => (
                      <Select.Option key={index} value={_.toNumber(item.wri_id_stat_id)}>
                        {`${item.wri_id_stat_id} - ${item.wri_id_stat_name}`}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              {listing && (
                <Form.Item
                  name="producer_name"
                  label={t('fields.wriProducerName')}
                  rules={[
                    {
                      required: true,
                      validator: validateField,
                      label: t('fields.wriProducerName'),
                      maxLength: 60,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}

              {listing && (
                <Form.Item
                  name="pickup_location"
                  label={t('fields.wriPickupLocation')}
                  rules={[
                    {
                      required: true,
                      validator: validateField,
                      label: t('fields.wriPickupLocation'),
                      maxLength: 100,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}

              {listing && (
                <Form.Item
                  name="waste_classification"
                  label={t('fields.wriWasteClassification')}
                  rules={[
                    {
                      required: true,
                      validator: validateField,
                      label: t('fields.wriWasteClassification'),
                      maxLength: 20,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}

              <Form.Item
                name="vehicle_registration"
                label={t('fields.wriVehicleRegistration')}
                rules={[
                  {
                    required: true,
                    validator: validateField,
                    label: t('fields.wriVehicleRegistration'),
                    maxLength: 10,
                  },
                ]}
                /* extra= {
                  <Checkbox checked={vehicleMode} onChange={onCheck}>
                    {t('fields.wriVehicleMode')}
                  </Checkbox>
                } */
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  disabled={isValidating}
                  loading={isValidating}
                  showSearch
                  allowClear
                  // onChange={onChange}
                  optionFilterProp="children"
                  placeholder={!value ? t('placeholder.selectTanker') : null}
                  filterOption={(input, option) =>
                    String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {tankers?.records.map((item, index) => (
                    <Select.Option
                      key={index}
                      value={item.tnkr_code}
                      disabled={item.tnkr_lock === 'Y' || item.tnkr_archive === 'Y'}
                    >
                      {item.tnkr_desc}
                      {item.tnkr_lock === 'Y' ? <LockOutlined style={{ color: 'red' }} /> : ''}
                      {item.tnkr_archive === 'Y' ? <PaperClipOutlined style={{ color: 'red' }} /> : ''}
                    </Select.Option>
                  ))}
                </Select>
                {/* <Input disabled={false}/> */}
              </Form.Item>

              {listing && (
                <Form.Item
                  name="contract_number"
                  label={t('fields.wriContractNumber')}
                  rules={[
                    {
                      required: true,
                      validator: validateField,
                      label: t('fields.wriContractNumber'),
                      maxLength: 9,
                    },
                  ]}
                >
                  <Input disabled={true} />
                </Form.Item>
              )}

              <EffectiveFrom form={form} value={selected} />
              <ExpiredAfter form={form} value={selected} />

              <Form.Item
                name="wri_status"
                label={t('fields.wriStatus')}
                rules={[{ required: true, validator: validateList, label: t('fields.wriStatus') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  // loading={isValidating}
                  showSearch
                  disabled={!listing}
                  onChange={setStatus}
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectWriStatus')}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {statusTypes?.records?.map((item, index) => (
                    <Select.Option key={index} value={_.toNumber(item.wri_status_id)}>
                      {`${item.wri_status_id} - ${item.wri_status_name}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default WriNumbers;
