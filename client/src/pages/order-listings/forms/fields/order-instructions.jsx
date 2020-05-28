import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { ORDER_LISTINGS } from '../../../../api';

const OrderInstructions = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { isValidating } = useSWR(
    `${ORDER_LISTINGS.INSTRUCTIONS}?order_sys_no=${value?.order_sys_no}`, { 
      refreshInterval: 0,
      onSuccess: 
        (data, key, config) => {
          console.log('Entered onSuccess!!!'); 
          console.log({data}); 
          let txt='';
          if (data.records.length > 0) {
            data.records.forEach((item) => {
              txt += item.oinst_text;
            });
          }
          value.order_instructions = txt;
        }
    }
  );

  const validate = (rule, input) => {
    /*
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.orderInstructions')}`);
    }
    if (input && input.length > 60) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 60 ─ ${t('descriptions.maxCharacters')}`);
    }
    */

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_instructions: value.order_instructions
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="order_instructions" 
      label={t('fields.orderInstructions')} 
      rules={[{ required: false, validator: validate }]}
    >
      <Input.TextArea 
        disabled={(pageState==='create'||pageState==='edit')? false : true}
      />
    </Form.Item>
  );
};

export default OrderInstructions;
