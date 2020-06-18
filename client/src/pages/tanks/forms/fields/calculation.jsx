import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Input, Select } from 'antd';
import _ from 'lodash';
import { VCFManager } from '../../../../utils';

const { Option } = Select;

const Calculation = ({ form, value, range, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const [tempBounds, setTempBounds] = useState({
    min: value?.tank_bclass_temp_lo || -50,
    max: value?.tank_bclass_temp_hi || 150,
    type: 'ºC',
  });

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_15_density: value?.tank_15_density,
        tank_density: value?.tank_density,
        tank_api: value?.tank_api,
        tank_prod_lvl: value?.tank_prod_lvl,
        tank_prod_c_of_e: value?.tank_prod_c_of_e,
        tank_temp: value?.tank_temp,
        tank_amb_vol: value?.tank_amb_vol,
        tank_cor_vol: value?.tank_cor_vol,
        tank_liquid_kg: value?.tank_liquid_kg,
      });
    }
  }, [value, setFieldsValue]);

  const handleTemperature = (selected) => {
    if (selected !== 'degC') {
      setTempBounds({
        min: VCFManager.temperatureC2F(value?.tank_bclass_temp_lo),
        max: VCFManager.temperatureC2F(value?.tank_bclass_temp_hi),
        type: 'ºF',
      });
      setFieldsValue({
        tank_temp: VCFManager.temperatureC2F(value?.tank_temp),
      });
    } else {
      setTempBounds({
        min: value?.tank_bclass_temp_lo,
        max: value?.tank_bclass_temp_hi,
        type: 'ºC',
      });

      setFieldsValue({
        tank_temp: value?.tank_temp,
      });
    }
  };

  const temperaturePostfix = (
    <Form.Item name="tank_temp_unit" noStyle>
      <Select defaultValue={config?.temperatureUnit || 'degC'} onChange={handleTemperature}>
        <Option value="degC">Celcius</Option>
        <Option value="degF">Fahrenheit</Option>
      </Select>
    </Form.Item>
  );

  const validateTemperature = (rule, input) => {
    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    if (invalid) {
      return Promise.reject(`${t('validate.wrongType')} ─ ${t('validate.mustBeNumber')}`);
    }

    if ((!invalid && number < _.toNumber(tempBounds.min)) || number > _.toNumber(tempBounds.hi)) {
      return Promise.reject(
        `${t('validate.outOfRange')} ─ ${t('validate.mustBeBetween')} ${tempBounds.min} & ${tempBounds.hi}`
      );
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        name="tank_15_density"
        label={`${t('fields.standardDensity')} (${value?.tank_base_dens_lo} - ${value?.tank_base_dens_hi}) ${
          `@${config?.referenceTemperature}ºC` || '@15ºC/59ºF'
        }`}
      >
        <InputNumber
          min={value?.tank_base_dens_lo}
          max={value?.tank_base_dens_hi}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="tank_density"
        label={`${t('fields.density')} (${value?.tank_base_dens_lo} - ${value?.tank_base_dens_hi}) ${
          `@${config?.vsmCompensation}ºC` || '@15ºC/59ºF'
        }`}
      >
        <InputNumber
          min={value?.tank_base_dens_lo}
          max={value?.tank_base_dens_hi}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="tank_api"
        label={`${t('fields.api')} (${range?.low || 0} - ${range?.high || 90}) @60ºF`}
      >
        <InputNumber min={range?.low || 0} max={range?.high || 90} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_prod_lvl" label={`${t('fields.productLevel')} (mm)`}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_prod_c_of_e" label={`${t('fields.expCoeff')} (0.000414 - 0.001674)`}>
        <InputNumber min={0.000414} step={0.0001} max={0.001674} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="tank_temp"
        label={`${t('fields.observedTemperature')} (${tempBounds.min}${tempBounds.type} - ${tempBounds.max}${
          tempBounds.type
        })`}
        rules={[{ validator: validateTemperature }]}
      >
        <Input style={{ width: '100%' }} addonAfter={temperaturePostfix} />
      </Form.Item>

      <Form.Item name="tank_amb_vol" label={`${t('fields.ambientVolume')} (Litres)`}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_cor_vol" label={`${t('fields.standardVolume')} (Litres)`}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_liquid_kg" label={`${t('fields.liquidMass')} (Kg)`}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
};

export default Calculation;
