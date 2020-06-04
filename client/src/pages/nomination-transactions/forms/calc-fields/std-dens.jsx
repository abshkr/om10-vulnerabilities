import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import axios from 'axios';

const StdDensity = ({ form, value, tank, pageState }) => {
  console.log("in StdDensity", tank);
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranStdDens')}`);
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
        mlitm_dens_cor: value.mlitm_dens_cor,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (tank) {
      setFieldsValue({
        mlitm_dens_cor: tank?.[0]?.tank_density,
      });
    }
  }, [tank, setFieldsValue]);

  return (
    <Form.Item 
      name="mlitm_dens_cor" 
      label={t('fields.nomtranStdDens')+'('+t('fields.nomtranStdDensUnit')+')'}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber 
        style={{ width: '100%' }} 
        disabled={pageState==='transfer'? false : false}
      />
    </Form.Item>
  );
};

export default StdDensity;
