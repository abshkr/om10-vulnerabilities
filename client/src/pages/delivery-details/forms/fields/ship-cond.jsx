import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import axios from 'axios';

const ShipCondition = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddShipCond')}`);
      }
    }
    
    if (input && input.length > 128) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 128 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_ship_cond: value.dd_ship_cond,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="dd_ship_cond" 
      label={t('fields.ddShipCond')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input 
        style={{ width: '100%' }} 
        disabled={pageState==='create'? false : false}
      />
    </Form.Item>
  );
};

export default ShipCondition;
