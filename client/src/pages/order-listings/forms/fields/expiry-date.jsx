import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const ExpiryDate= ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  const validate = (rule, input) => {
    
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderExpTime')}`);
    }
    
    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_exp_time: 
          value.order_exp_time === '' ? null : moment(value.order_exp_time, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        //order_exp_time: moment(),
        order_exp_time: moment().add(365,'days'),//.format(SETTINGS.DATE_TIME_FORMAT),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="order_exp_time" 
      label={t('fields.orderExpTime')}
      rules={[{ required: true, validator: validate }]}
    >
      <DatePicker 
        showTime 
        format={FORMAT} 
        style={{ width: '100%' }} 
        disabled={(pageState==='create'||pageState==='edit'||pageState==='detail')? false : true}
      />
    </Form.Item>
  );
};

export default ExpiryDate;
