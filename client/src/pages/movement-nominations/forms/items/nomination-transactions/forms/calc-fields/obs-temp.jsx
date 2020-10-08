import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import _ from 'lodash';
import { validateField } from '../../../../../../../utils';

const ObsTemp = ({ form, value, setValue, tank, arm, pageState, config }) => {
  const [minTemp, setMinTemp] = useState(config.minTemperature);
  const [maxTemp, setMaxTemp] = useState(config.maxTemperature);

  console.log('in ObsTemp', tank);
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  /* const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranObsTemp')}`);
      }
    }

    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  }; */

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_temp_amb: value.mlitm_temp_amb,
      });

      setValue(value.mlitm_temp_amb);
    }
  }, [value, setFieldsValue, setValue]);

  useEffect(() => {
    if (tank && tank.length > 0) {
      setFieldsValue({
        mlitm_temp_amb: tank?.[0]?.tank_temp,
      });
      setMinTemp(tank?.[0]?.bclass_temp_lo || config.minTemperature);
      setMaxTemp(tank?.[0]?.bclass_temp_hi || config.maxTemperature);
      setValue(tank?.[0]?.tank_temp);
    } else {
      setFieldsValue({
        mlitm_temp_amb: null,
      });
      setMinTemp(config.minTemperature);
      setMaxTemp(config.maxTemperature);
      setValue(null);
    }
  }, [tank, setFieldsValue, setMinTemp, setMaxTemp, setValue]);

  return (
    <Form.Item
      name="mlitm_temp_amb"
      label={t('fields.nomtranObsTemp') + '[' + String(minTemp) + ' ~ ' + String(maxTemp) + ']' + '(' + t('units.degC') + ')'}
      // rules={[{ required: false, validator: validate }]}
      rules={[{ 
        required: false,
        title: t('fields.nomtranObsTemp'), 
        dataType: 'NUMBER',
        // maxLength: 9, 
        precision: null, // config.precisionTemperature,
        min: _.toNumber(minTemp), 
        max: _.toNumber(maxTemp),
        prompts: t,
        // returnType: 'notice',
        validator: validateField 
      }]}
    >
      <InputNumber
        // min={_.toNumber(minTemp)}
        // max={_.toNumber(maxTemp)}
        precision={config.precisionTemperature}
        style={{ width: '100%' }}
        disabled={pageState === 'transfer' ? false : false}
        // placeholder={String(minTemp) + ' ~ ' + String(maxTemp)}
        onChange={setValue}
      />
    </Form.Item>
  );
};

export default ObsTemp;
