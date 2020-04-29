import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Calculation = ({ form, value, range }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_15_density: value.tank_15_density,
        tank_density: value.tank_density,
        tank_api: value.tank_api,
        tank_prod_lvl: value.tank_prod_lvl,
        tank_prod_c_of_e: value.tank_prod_c_of_e,
        tank_temp: value.tank_temp,
        tank_amb_vol: value.tank_amb_vol,
        tank_cor_vol: value.tank_cor_vol,
        tank_liquid_kg: value.tank_liquid_kg,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="tank_15_density"
        label={`${t('fields.standardDensity')} (${value.tank_base_dens_lo} - ${
          value.tank_base_dens_hi
        }) @15ºC/59ºF`}
      >
        <InputNumber
          min={value?.tank_base_dens_lo}
          max={value?.tank_base_dens_hi}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="tank_density"
        label={`${t('fields.density')} (${value.tank_base_dens_lo} - ${value.tank_base_dens_hi})`}
      >
        <InputNumber min={value.tank_base_dens_lo} max={value.tank_base_dens_hi} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_api" label={`${t('fields.api')} (${range.low} - ${range.high}) @60ºF`}>
        <InputNumber min={range.low} max={range.high} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_prod_lvl" label={`${t('fields.productLevel')} (mm)`}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_prod_c_of_e" label={`${t('fields.expCoeff')} (0.000414 - 0.001674)`}>
        <InputNumber min={0.000414} step={0.0001} max={0.001674} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="tank_temp"
        label={`${t('fields.observedTemperature')} (${value.tank_bclass_temp_lo}ºC - ${
          value.tank_bclass_temp_hi
        }ºC)`}
      >
        <InputNumber
          min={value?.tank_bclass_temp_lo}
          max={value?.tank_bclass_temp_hi}
          style={{ width: '100%' }}
        />
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
