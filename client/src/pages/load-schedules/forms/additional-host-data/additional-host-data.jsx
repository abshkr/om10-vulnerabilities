import React, { useEffect, useState } from 'react';
import { CloseOutlined, PlusOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Drawer, Tabs, Form, Select, InputNumber, Modal, notification, message } from 'antd';
import { useTranslation } from 'react-i18next';

import useSWR from 'swr';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { SETTINGS } from '../../../../constants';
import columns from './columns';

import api, { LOAD_SCHEDULES } from '../../../../api';

const { useForm } = Form;

const AdditionalHostData = ({ value }) => {
  const url = value
    ? `${LOAD_SCHEDULES.HOST_DATA}?supplier=${value.supplier_code}&trip_no=${value?.shls_trip_no}`
    : null;

  const { data: payload, revalidate } = useSWR(url);
  const { data: types, isValidating } = useSWR(LOAD_SCHEDULES.HOST_DATA_TYPES);

  const { t } = useTranslation();

  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isUpdating, setUpdating] = useState(undefined);

  const { setFieldsValue } = form;

  const fields = columns(t);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;
  // const user_name = decoded?.per_name;

  // console.log('decoded...........', decoded);

  const validateList = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.additionalHostDataType')}`);
      }
    }

    return Promise.resolve();
  };

  const validateText = (rule, input) => {
    if (rule.required) {
      if (input === '' || (input!==0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.additionalHostData')}`);
      }
    }

    if (input && input.length > 6) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 6 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const handleFormState = (visibility, record) => {
    setVisible(visibility);
    setSelected(record);
    if (!record) {
      setUpdating(undefined);
    } else {
      if (!record?.dh_dor_type &&
        !record?.dh_dor_number &&
        !record?.dh_chg_date &&
        !record?.dh_per_code &&
        !record?.dh_per_name) {
        setUpdating(false);
      } else {
        setUpdating(true);
      }
    }
  };

  const onComplete = () => {
    handleFormState(false, null);
    revalidate();
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      values.dh_dor_number = values?.dh_dor_type + String(values.dh_dor_number);
      values.dh_chg_date = moment().format(SETTINGS.DATE_TIME_FORMAT);
      values.dh_per_code = user_code;
      // values.dh_per_name = user_name;

      const record = {
        ...selected,
        ...values,
      };

      Modal.confirm({
        title: !isUpdating ? t('prompts.create') : t('prompts.update'),
        okText: !isUpdating ? t('operations.save') : t('operations.update'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          await api
            .post(!isUpdating ? LOAD_SCHEDULES.HOST_DATA_CREATE : LOAD_SCHEDULES.HOST_DATA_UPDATE, record)
            .then(() => {
              onComplete();

              notification.success({
                message: !isUpdating ? t('messages.createSuccess') : t('messages.updateSuccess'),
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
    } catch (error) {
      message.error({
        key: 'submit',
        content: t('descriptions.validationFailed'),
      });
    }
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
          .post(LOAD_SCHEDULES.HOST_DATA_DELETE, selected)
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

  useEffect(() => {
    if (selected) {
      setFieldsValue({
        dh_dor_type: selected?.dh_dor_type,
        dh_dor_number: selected?.dh_dor_number?.substring(selected?.dh_dor_type?.length),
      });
    }
  }, [selected]);

  return (
    <>
      <DataTable
        data={payload?.records}
        columns={fields}
        onClick={(payload) => handleFormState(true, payload)}
      />

      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        width="33vw"
        onClose={() => handleFormState(false, null)}
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
              icon={<PlusOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onFinish}
            >
              {!isUpdating ? t('operations.save') : t('operations.update')}
            </Button>

            {isUpdating && (
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                onClick={onDelete}
              >
                {t('operations.delete')}
              </Button>
            )}
          </>
        }
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane key="1" tab={t('tabColumns.additionalHostData')}>
            <Form layout="vertical" form={form}>
              <Form.Item 
                name="dh_dor_type" 
                label={t('fields.additionalHostDataType')}
                rules={[{ required: true, validator: validateList }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  loading={isValidating}
                  showSearch
                  optionFilterProp="children"
                  placeholder={!value ? t('placeholder.selectHostDataType') : null}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {types?.records.map((item, index) => (
                    <Select.Option key={index} value={item?.type}>
                      {item?.type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item 
                name="dh_dor_number" 
                label={t('fields.additionalHostData')}
                rules={[{ required: true, validator: validateText }]}
              >
                <InputNumber min={0} maxLength={6} precision={0} style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default AdditionalHostData;
