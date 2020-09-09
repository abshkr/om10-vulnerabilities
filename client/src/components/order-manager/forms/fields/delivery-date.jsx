import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Col } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const DeliveryDate= ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  const validate = (rule, input) => {
    
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderDlvTime')}`);
    }
    
    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_dlv_time: 
          value.order_dlv_time === '' ? null : moment(value.order_dlv_time, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        order_dlv_time: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="order_dlv_time" 
      label={t('fields.orderDlvTime')}
      rules={[{ required: true, validator: validate }]}
    >
      <DatePicker 
        showTime 
        format={FORMAT} 
        style={{ width: '100%' }} 
        disabled={true}
      />
    </Form.Item>
  );
};

export default DeliveryDate;
