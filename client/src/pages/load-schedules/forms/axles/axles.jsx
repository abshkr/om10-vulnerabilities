import React, { useEffect, useState } from 'react';
import { CloseOutlined, PlusOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Drawer, Tabs, Form, InputNumber, Modal, notification, message, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import useSWR from 'swr';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { SETTINGS } from '../../../../constants';
import columns from './columns';

import api, { TRIP_AXLES } from '../../../../api';

const { useForm } = Form;

const Axles = ({ value }) => {
  const url = value
    ? `${TRIP_AXLES.READ}?supplier_code=${value.supplier_code}&shls_trip_no=${value?.shls_trip_no}`
    : null;

  const { data: payload, revalidate } = useSWR(url);

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

  const validateWeighInMass = (rule, input) => {
    if (rule.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.axleWeighInMass')}`);
      }
    }

    return Promise.resolve();
  };

  const validateWeighOutMass = (rule, input) => {
    if (rule.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.axleWeighOutMass')}`);
      }
    }

    return Promise.resolve();
  };

  const validateWeighInTime = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.axleWeighInTime')}`);
      }
    }

    // compare axleWeighInTime with axleWeighOutTime
    const weighOutTime = form.getFieldValue('time_weigh_out');
    if (!(!input || !weighOutTime)) {
      if (input.isAfter(weighOutTime)) {
        return Promise.reject(`${t('validate.axleWeighInLaterThanWeighOutTime')}`);
      }
    }

    return Promise.resolve();
  };

  const validateWeighOutTime = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.axleWeighOutTime')}`);
      }
    }

    // compare axleWeighInTime with axleWeighOutTime
    const weighInTime = form.getFieldValue('time_weigh_in');
    if (!(!input || !weighInTime)) {
      if (weighInTime.isAfter(input)) {
        return Promise.reject(`${t('validate.axleWeighOutEarlierThanWeighInTime')}`);
      }
    }

    return Promise.resolve();
  };

  const onChange = () => {
    form.validateFields(['time_weigh_in', 'time_weigh_out']);
  };

  const handleFormState = (visibility, record) => {
    setVisible(visibility);
    setSelected(record);
    if (!record) {
      setUpdating(undefined);
    } else {
      if (
        !record?.axle_weigh_in &&
        !record?.axle_weigh_out &&
        !record?.time_weigh_in &&
        !record?.time_weigh_out
      ) {
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

      if (!values?.time_weigh_in) {
        values.time_weigh_in = '';
      } else {
        values.time_weigh_in = values.time_weigh_in?.format(SETTINGS.DATE_TIME_FORMAT);
      }

      if (!values?.time_weigh_out) {
        values.time_weigh_out = '';
      } else {
        values.time_weigh_out = values.time_weigh_out?.format(SETTINGS.DATE_TIME_FORMAT);
      }

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
            .post(!isUpdating ? TRIP_AXLES.CREATE : TRIP_AXLES.UPDATE, record)
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
          .post(TRIP_AXLES.DELETE, selected)
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
        tnkr_axle_id: selected?.tnkr_axle_id,
        axle_weigh_in: selected?.axle_weigh_in,
        axle_weigh_out: selected?.axle_weigh_out,
        time_weigh_in: !selected?.time_weigh_in
          ? null
          : moment(selected?.time_weigh_in, SETTINGS.DATE_TIME_FORMAT),
        time_weigh_out: !selected?.time_weigh_out
          ? null
          : moment(selected?.time_weigh_out, SETTINGS.DATE_TIME_FORMAT),
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
          <Tabs.TabPane key="1" tab={t('tabColumns.axleWeighInOut')}>
            <Form layout="vertical" form={form}>
              <Form.Item
                name="tnkr_axle_id"
                label={t('fields.id')}
                // rules={[{ required: true, validator: validateText }]}
              >
                <InputNumber min={1} precision={0} style={{ width: '100%' }} disabled />
              </Form.Item>

              <Form.Item
                name="axle_weigh_in"
                label={t('fields.axleWeighInMass') + ' (' + t('units.kg') + ')'}
                rules={[{ required: true, validator: validateWeighInMass }]}
              >
                <InputNumber min={0} maxLength={9} precision={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="axle_weigh_out"
                label={t('fields.axleWeighOutMass') + ' (' + t('units.kg') + ')'}
                rules={[{ required: true, validator: validateWeighOutMass }]}
              >
                <InputNumber min={0} maxLength={9} precision={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="time_weigh_in"
                label={t('fields.axleWeighInTime')}
                rules={[{ required: true, validator: validateWeighInTime }]}
              >
                <DatePicker showTime style={{ width: '100%' }} onChange={onChange} />
              </Form.Item>
              <Form.Item
                name="time_weigh_out"
                label={t('fields.axleWeighOutTime')}
                rules={[{ required: true, validator: validateWeighOutTime }]}
              >
                <DatePicker showTime style={{ width: '100%' }} onChange={onChange} />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default Axles;
