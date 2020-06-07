import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import axios from 'axios';

const NominationItemKey = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranItemKey')}`);
      }
    }
    
    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_item_key: value.mvitm_item_key,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="mvitm_item_key" 
      label={t('fields.nomtranItemKey')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input 
        style={{ width: '100%' }} 
        disabled={pageState==='create'? true : true}
      />
    </Form.Item>
  );
};

export default NominationItemKey;
