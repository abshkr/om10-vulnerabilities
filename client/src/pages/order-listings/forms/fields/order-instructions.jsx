import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { ORDER_LISTINGS } from '../../../../api';

const OrderInstructions = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: payload } = useSWR(
    `${ORDER_LISTINGS.INSTRUCTIONS}?order_sys_no=${value?.order_sys_no}`, { 
      refreshInterval: 0,
    }
  );
  /*
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
          console.log("txt", txt);
          value.order_instructions = txt;
          console.log("value.order_instructions", value.order_instructions);
        }
    }
  );
  */
  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.orderInstructions')}`);
      }
    }
    /*
    if (input && input.length > 60) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 60 ─ ${t('descriptions.maxCharacters')}`);
    }
    */

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      console.log({payload}); 
      let txt='';
      if (payload?.records.length > 0) {
        payload.records.forEach((item) => {
          txt += item.oinst_text;
        });
      }
      console.log("txt", txt);
      value.order_instructions = txt;
      console.log("value.order_instructions", value.order_instructions);
      setFieldsValue({
        order_instructions: value.order_instructions
      });
    }
  }, [payload, value, setFieldsValue]);

  return (
    <Form.Item 
      name="order_instructions" 
      label={t('fields.orderInstructions')} 
      rules={[{ required: false, validator: validate }]}
    >
      <Input.TextArea 
        style={{width:'100%'}}
        disabled={(pageState==='create'||pageState==='edit')? false : true}
      />
    </Form.Item>
  );
};

export default OrderInstructions;
