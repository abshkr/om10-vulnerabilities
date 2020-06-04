import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import axios from 'axios';

const StdQty = ({ form, value, onChange, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranStdQty')}`);
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
        mlitm_qty_cor: value.mlitm_qty_cor,
      });
    }
  }, [value, setFieldsValue]);

  const handleFieldChange = (value) => {
    onChange({qty: value, type: 'L15'});
  }

  return (
    <Form.Item 
      name="mlitm_qty_cor" 
      label={t('fields.nomtranStdQty')+'('+t('fields.nomtranStdQtyUnit')+')'}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber 
        style={{ width: '100%' }} 
        onChange={handleFieldChange}
        disabled={pageState==='transfer'? false : false}
      />
    </Form.Item>
  );
};

export default StdQty;
