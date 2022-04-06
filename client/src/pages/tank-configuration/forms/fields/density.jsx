import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { BASE_PRODUCTS } from '../../../../api';
import { getDensityRange } from '../../../../utils';

const Density = ({ form, value, product, config, onChange }) => {
  const { t } = useTranslation();
  const { data: payload, isValidating } = useSWR(BASE_PRODUCTS.READ);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(2000);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const decimals = new RegExp('^[0-9]+(.[0-9]{1,3})?$');
    const validDecimals = decimals.exec(input);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.density')}`);
    }

    if (input && !validDecimals) {
      return Promise.reject(`${t('placeholder.maxPlaces')}: 3 ─ ${t('descriptions.invalidDecimals')}`);
    }

    if (_.toNumber(input) < _.toNumber(low)) {
      return Promise.reject(`${t('placeholder.limit')}: ${low} ─ ${t('descriptions.valueTooLow')}`);
    }

    if (_.toNumber(input) > _.toNumber(high)) {
      return Promise.reject(`${t('placeholder.limit')}: ${high} ─ ${t('descriptions.valueTooHigh')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_density: value.tank_density,
      });
      if (onChange) {
        onChange(value.tank_density);
      }
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (payload) {
      const base = _.find(payload?.records, (record) => {
        return record.base_code === product;
      });

      if (base) {
        const densRange = getDensityRange({
          manageFlag: config.manageBaseProductDensityRange,
          useFlag: config.useBaseProductDensityRange,
          minDefaultDensity: config.minDensity,
          maxDefaultDensity: config.maxDensity,
          minClassDensity: base.base_class_dens_lo,
          maxClassDensity: base.base_class_dens_hi,
          minBaseDensity: base.base_dens_lo,
          maxBaseDensity: base.base_dens_hi,
        });
        setLow(densRange.min);
        setHigh(densRange.max);

        /* if (base.base_dens_lo && config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
          setLow(base.base_dens_lo);
        } else {
          if (base.base_class_dens_lo) {
            setLow(base.base_class_dens_lo);
          } else {
            setLow(0);
          }
        }
        if (base.base_dens_hi && config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
          setHigh(base.base_dens_hi);
        } else {
          if (base.base_class_dens_hi) {
            setHigh(base.base_class_dens_hi);
          } else {
            setHigh(2000);
          }
        } */
      } else {
        setLow(config.minDensity);
        setHigh(config.maxDensity);
      }
    }
  }, [payload, product]);

  const onFieldChanged = (event) => {
    if (onChange) {
      onChange(event?.target?.value);
    }
  };

  const affix = isValidating ? t('messages.calculating') : `${low} - ${high} ${t('units.kg/m3')}`;
  const disabled = isValidating || !product;

  return (
    <Form.Item
      name="tank_density"
      label={t('fields.standardDensity')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={disabled} addonAfter={affix} onChange={onFieldChanged} />
    </Form.Item>
  );
};

export default Density;
