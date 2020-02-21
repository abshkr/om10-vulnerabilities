import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { BASE_PRODUCTS } from '../../../../api';

const Density = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: payload, isValidating } = useSWR(BASE_PRODUCTS.READ);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const product = getFieldValue('tank_base');

  const validate = (rule, input, callback) => {
    const decimals = new RegExp('^[0-9]+(.[0-9]{1,3})?$');
    const validDecimals = decimals.exec(input);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.density')}`);
    }

    if (input && !validDecimals) {
      callback(`${t('placeholder.maxPlaces')}: 3 ─ ${t('descriptions.invalidDecimals')}`);
    }

    if (_.toInteger(input) < _.toInteger(low)) {
      callback(`${t('placeholder.limit')}: ${low} ─ ${t('descriptions.valueTooLow')}`);
    }

    if (_.toInteger(input) > _.toInteger(high)) {
      callback(`${t('placeholder.limit')}: ${high} ─ ${t('descriptions.valueTooHigh')}`);
    }

    callback();
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
  }, [payload, getFieldValue, product]);

  const affix = isValidating ? t('messages.calculating') : `${low} - ${high} ${t('units.kgm3')}`;
  const disabled = isValidating || !product;

  return (
    <Form.Item label={t('fields.density')}>
      {getFieldDecorator('tank_density', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={disabled} addonAfter={affix} />)}
    </Form.Item>
  );
};

export default Density;
