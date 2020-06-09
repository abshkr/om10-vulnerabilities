import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import axios from 'axios';
import _ from 'lodash';

const StdDensity = ({ form, value, tank, pageState }) => {
  const [minDens, setMinDens] = useState(0);
  const [maxDens, setMaxDens] = useState(2000);

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
    if (tank && tank.length>0) {
      setFieldsValue({
        mlitm_dens_cor: tank?.[0]?.tank_density,
      });
      setMinDens(tank?.[0]?.bclass_dens_lo);
      setMaxDens(tank?.[0]?.bclass_dens_hi);
    }
    else {
      setFieldsValue({
        mlitm_dens_cor: null,
      });
      setMinDens(0);
      setMaxDens(2000);
    }
  }, [tank, setFieldsValue, setMinDens, setMaxDens]);

  return (
    <Form.Item 
      name="mlitm_dens_cor" 
      label={t('fields.nomtranStdDens')+'('+t('fields.nomtranStdDensUnit')+')'}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber 
        style={{ width: '100%' }} 
        disabled={pageState==='transfer'? false : false}
        placeholder={String(minDens)+" ~ "+String(maxDens)}
        min={_.toNumber(minDens)}
        max={_.toNumber(maxDens)}
        //step={0.01}
      />
    </Form.Item>
  );
};

export default StdDensity;
