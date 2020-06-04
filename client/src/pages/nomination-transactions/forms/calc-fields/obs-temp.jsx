import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import axios from 'axios';

const ObsTemp = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranObsTemp')}`);
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
        mlitm_temp_amb: value.mlitm_temp_amb,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="mlitm_temp_amb" 
      label={t('fields.nomtranObsTemp')+'('+t('fields.nomtranObsTempUnit')+')'}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber 
        style={{ width: '100%' }} 
        disabled={pageState==='transfer'? false : false}
      />
    </Form.Item>
  );
};

export default ObsTemp;
