import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import axios from 'axios';

const NominationItemType = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranType')}`);
      }
    }
    
    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_type: value.mvitm_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="mvitm_type" 
      label={t('fields.nomtranType')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input 
        style={{ width: '100%' }} 
        disabled={pageState==='create'? true : true}
      />
    </Form.Item>
  );
};

export default NominationItemType;
