import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { BASE_PRODUCTS } from '../../../../api';

const Density = ({ form, value, product }) => {
  const { t } = useTranslation();
  const { data: payload, isValidating } = useSWR(BASE_PRODUCTS.READ);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);

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

    if (_.toInteger(input) < _.toInteger(low)) {
      return Promise.reject(`${t('placeholder.limit')}: ${low} ─ ${t('descriptions.valueTooLow')}`);
    }

    if (_.toInteger(input) > _.toInteger(high)) {
      return Promise.reject(`${t('placeholder.limit')}: ${high} ─ ${t('descriptions.valueTooHigh')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_density: value.tank_density
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (payload) {
      const base = _.find(payload?.records, record => {
        return record.base_code === product;
      });

      if (base) {
        setLow(base.base_class_dens_lo);
        setHigh(base.base_class_dens_hi);
      }
    }
  }, [payload, product]);

  const affix = isValidating ? t('messages.calculating') : `${low} - ${high} ${t('units.kgm3')}`;
  const disabled = isValidating || !product;

  return (
    <Form.Item
      name="tank_density"
      label={t('fields.density')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={disabled} addonAfter={affix} />
    </Form.Item>
  );
};

export default Density;
