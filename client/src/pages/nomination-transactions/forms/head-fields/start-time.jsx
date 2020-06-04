import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Col } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const ItemEffectTime= ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranDtStart')}`);
      }
    }
    
    if (input === '' || !input) {
    }
    
    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_dtim_effect: '' ? null : moment(value.mvitm_dtim_effect, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        mvitm_dtim_effect: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="mvitm_dtim_effect" 
      label={t('fields.nomtranDtStart')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker 
        showTime 
        format={FORMAT} 
        style={{ width: '100%' }} 
        disabled={(pageState==='create')? false : false}
      />
    </Form.Item>
  );
};

export default ItemEffectTime;
