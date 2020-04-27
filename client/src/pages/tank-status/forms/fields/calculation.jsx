import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Calculation = ({ form, value }) => {
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

      <Form.Item name="tank_api" label={t('fields.api')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_prod_lvl" label={t('fields.productLevel')}>
        <InputNumber
          min={0}
          max={999999999}
          style={{ width: '100%' }}
          formatter={(value) => `${value} mm`}
          parser={(value) => value.replace(' mm', '')}
        />
      </Form.Item>

      <Form.Item name="tank_prod_c_of_e" label={t('fields.expCoeff')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_temp" label={t('fields.observedTemperature')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_amb_vol" label={t('fields.ambientVolume')}>
        <InputNumber
          min={0}
          max={999999999}
          style={{ width: '100%' }}
          formatter={(value) => `${value} Litres`}
          parser={(value) => value.replace(' Litres', '')}
        />
      </Form.Item>

      <Form.Item name="tank_cor_vol" label={t('fields.standardVolume')}>
        <InputNumber
          min={0}
          max={999999999}
          style={{ width: '100%' }}
          formatter={(value) => `${value} Litres`}
          parser={(value) => value.replace(' Litres', '')}
        />
      </Form.Item>

      <Form.Item name="tank_liquid_kg" label={t('fields.liquidMass')}>
        <InputNumber
          min={0}
          max={999999999}
          style={{ width: '100%' }}
          formatter={(value) => `${value} kg`}
          parser={(value) => value.replace(' kg', '')}
        />
      </Form.Item>
    </>
  );
};

export default Calculation;
