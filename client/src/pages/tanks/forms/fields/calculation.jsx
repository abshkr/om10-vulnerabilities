import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, InputNumber, Select } from 'antd';
import _ from 'lodash';
import { VCFManager } from '../../../../utils';
import { InputNumber as OmegaInputNumber } from '../../../../components';
import CheckboxGroup from 'antd/es/checkbox/Group';

const { Option } = Select;

const Calculation = ({ form, value, range, config, pinQuantity, pinDensity }) => {
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
        //tank_15_density: value?.tank_15_density,
        //tank_density: value?.tank_density,
        //tank_api: value?.tank_api,
        //tank_prod_lvl: value?.tank_prod_lvl,
        //tank_prod_c_of_e: value?.tank_prod_c_of_e,
        tank_temp: value?.tank_temp,
        tank_amb_vol: value?.tank_amb_vol,
        tank_cor_vol: value?.tank_cor_vol,
        tank_liquid_kg: value?.tank_liquid_kg,
      });

      // initialize the density source for calculation
      if (value?.tank_density) {
        pinDensity({ dens: value?.tank_density, type: 'D30C', title: t('fields.density') });
      } else if (value?.tank_api) {
        pinDensity({ dens: value?.tank_api, type: 'A60F', title: t('fields.api') });
      } else {
        pinDensity({ dens: value?.tank_15_density, type: 'D15C', title: t('fields.standardDensity') });
      }
      // initialize the quantity source for calculation
      if (value?.tank_amb_vol) {
        pinQuantity({ qty: value?.tank_amb_vol, type: 'LT', title: t('fields.ambientVolume') });
      } else if (value?.tank_cor_vol) {
        pinQuantity({ qty: value?.tank_cor_vol, type: 'L15', title: t('fields.standardVolume') });
      } else {
        pinQuantity({ qty: value?.tank_liquid_kg, type: 'KG', title: t('fields.liquidMass') });
      }
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

    const precision = _.toString(number).split('.')[1]?.length || 0;

    if (invalid) {
      return Promise.reject(`${t('validate.wrongType')} ─ ${t('validate.mustBeNumber')}`);
    }

    if (precision > 2) {
      return Promise.reject(`${t('validate.outOfRange')} ─ ${t('validate.decimalPlacesExceeded')}`);
    }

    if (number < tempBounds.min || number > tempBounds.max) {
      return Promise.reject(
        `${t('validate.outOfRange')} ─ ${t('validate.mustBeBetween')} ${tempBounds.min} & ${tempBounds.max}`
      );
    }

    return Promise.resolve();
  };

  const handleAmbVolFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'LT', title: t('fields.ambientVolume') });
    }
  };

  const handleCorVolFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'L15', title: t('fields.standardVolume') });
    }
  };

  const handleMassQtyFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'KG', title: t('fields.liquidMass') });
    }
  };

  const handleStdDensFieldChange = (value) => {
    //console.log('handleStdDensFieldChange', value);
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinDensity({ dens: value, type: 'D15C', title: t('fields.standardDensity') });
    }
  };

  const handleCorDensFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinDensity({ dens: value, type: 'D30C', title: t('fields.density') });
    }
  };

  const handleApiDensFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinDensity({ dens: value, type: 'A60F', title: t('fields.api') });
    }
  };

  return (
    <>
      {config?.temperatureUnit === 'degC' &&
        config?.referenceTemperature === '15' &&
        config?.vsmCompensation === '30' && (
          <OmegaInputNumber
            form={form}
            value={value?.tank_15_density}
            name="tank_15_density"
            label={`${t('fields.standardDensity')} (${value?.tank_base_dens_lo} - ${
              value?.tank_base_dens_hi
            }) ${`@${config?.referenceTemperature}ºC/${VCFManager.temperatureC2F(
              config?.referenceTemperature
            )}ºF`}`}
            min={value?.tank_base_dens_lo}
            max={value?.tank_base_dens_hi}
            style={{ width: '100%' }}
            precision={3}
            onChange={handleStdDensFieldChange}
          />
          /* <Form.Item
            name="tank_15_density"
            label={`${t('fields.standardDensity')} (${value?.tank_base_dens_lo} - ${
              value?.tank_base_dens_hi
            }) ${`@${config?.referenceTemperature}ºC/${VCFManager.temperatureC2F(
              config?.referenceTemperature
            )}ºF`}`}
          >
            <InputNumber
              min={value?.tank_base_dens_lo}
              max={value?.tank_base_dens_hi}
              style={{ width: '100%' }}
              precision={1}
              onChange={handleStdDensFieldChange}
            />
          </Form.Item> */
        )}

      <OmegaInputNumber
        form={form}
        value={value?.tank_density}
        name="tank_density"
        label={`${t('fields.density')} (${value?.tank_base_dens_lo} - ${value?.tank_base_dens_hi}) ${`@${
          config?.vsmCompensation || config?.referenceTemperature
        }ºC/${VCFManager.temperatureC2F(config?.vsmCompensation || config?.referenceTemperature)}ºF`}`}
        min={value?.tank_base_dens_lo}
        max={value?.tank_base_dens_hi}
        style={{ width: '100%' }}
        precision={3}
        onChange={handleCorDensFieldChange}
      />
      {/* <Form.Item
        name="tank_density"
        label={`${t('fields.density')} (${value?.tank_base_dens_lo} - ${value?.tank_base_dens_hi}) ${`@${
          config?.vsmCompensation || config?.referenceTemperature
        }ºC/${VCFManager.temperatureC2F(config?.vsmCompensation || config?.referenceTemperature)}ºF`}`}
      >
        <InputNumber
          min={value?.tank_base_dens_lo}
          max={value?.tank_base_dens_hi}
          style={{ width: '100%' }}
          precision={1}
          onChange={handleCorDensFieldChange}
        />
      </Form.Item> */}

      {config?.manageAPI && (
        <OmegaInputNumber
          form={form}
          value={value?.tank_api}
          name="tank_api"
          label={`${t('fields.api')} (${range?.low || 0} - ${range?.high || 85}) @60ºF`}
          min={range?.low || 0}
          max={range?.high || 85}
          style={{ width: '100%' }}
          precision={2}
          onChange={handleApiDensFieldChange}
        />
        /* <Form.Item
          name="tank_api"
          label={`${t('fields.api')} (${range?.low || 0} - ${range?.high || 85}) @60ºF`}
        >
          <InputNumber
            min={range?.low || 0}
            max={range?.high || 85}
            style={{ width: '100%' }}
            precision={1}
            onChange={handleApiDensFieldChange}
          />
        </Form.Item> */
      )}

      <OmegaInputNumber 
        form={form}
        value={value?.tank_prod_lvl}
        name="tank_prod_lvl"
        label={`${t('fields.productLevel')} (mm)`}
        min={0} 
        max={999999999} 
        style={{ width: '100%' }} 
      />
      {/* <Form.Item name="tank_prod_lvl" label={`${t('fields.productLevel')} (mm)`}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item> */}

      <OmegaInputNumber 
        form={form}
        value={value?.tank_prod_c_of_e}
        name="tank_prod_c_of_e" 
        label={`${t('fields.expCoeff')} (0.000414 - 0.001674)`}
        min={0.000414} 
        max={0.001674} 
        style={{ width: '100%' }} 
      />
      {/* <Form.Item name="tank_prod_c_of_e" label={`${t('fields.expCoeff')} (0.000414 - 0.001674)`}>
        <InputNumber min={0.000414} step={0.0001} max={0.001674} style={{ width: '100%' }} />
      </Form.Item> */}

      <Form.Item
        name="tank_temp"
        label={`${t('fields.observedTemperature')} (${tempBounds.min}${tempBounds.type} - ${tempBounds.max}${
          tempBounds.type
        })`}
        rules={[{ validator: validateTemperature }]}
      >
        <Input style={{ width: '100%' }} addonAfter={temperaturePostfix} type="number" />
      </Form.Item>

      <OmegaInputNumber 
        form={form}
        value={value?.tank_amb_vol}
        name="tank_amb_vol" 
        label={`${t('fields.ambientVolume')} (Litres)`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={value?.tank_base_class==='6' ? 3 : 0}
        onChange={handleAmbVolFieldChange}
      />
      {/* <Form.Item name="tank_amb_vol" label={`${t('fields.ambientVolume')} (Litres)`}>
        <InputNumber
          min={0}
          max={999999999}
          style={{ width: '100%' }}
          precision={1}
          onChange={handleAmbVolFieldChange}
        />
      </Form.Item> */}

      <OmegaInputNumber 
        form={form}
        value={value?.tank_cor_vol}
        name="tank_cor_vol"
        label={`${t('fields.standardVolume')} (Litres)`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={value?.tank_base_class==='6' ? 3 : 0}
        onChange={handleCorVolFieldChange}
      />
      {/* <Form.Item name="tank_cor_vol" label={`${t('fields.standardVolume')} (Litres)`}>
        <InputNumber
          min={0}
          max={999999999}
          style={{ width: '100%' }}
          precision={value?.tank_base_class==='6' ? 3 : 0}
          onChange={handleCorVolFieldChange}
        />
      </Form.Item> */}

      <OmegaInputNumber 
        form={form}
        value={value?.tank_liquid_kg}
        name="tank_liquid_kg"
        label={`${t('fields.liquidMass')} (Kg)`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={value?.tank_base_class==='6' ? 3 : 0}
        onChange={handleMassQtyFieldChange}
      />
      {/* <Form.Item name="tank_liquid_kg" label={`${t('fields.liquidMass')} (Kg)`}>
        <InputNumber
          min={0}
          max={999999999}
          style={{ width: '100%' }}
          precision={value?.tank_base_class==='6' ? 3 : 0}
          onChange={handleMassQtyFieldChange}
        />
      </Form.Item> */}
    </>
  );
};

export default Calculation;
