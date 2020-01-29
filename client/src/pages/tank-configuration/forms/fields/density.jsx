import React, { useState, useEffect } from 'react';
import { BASE_PRODUCTS } from '../../../../api';
import { Form, Input } from 'antd';
import axios from 'axios';
import _ from 'lodash';

const Density = ({ form, value, t, product }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);

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
    if (product) {
      const getContext = () => {
        axios.all([BASE_PRODUCTS.readBaseProduct()]).then(
          axios.spread(products => {
            const match = _.find(products.data.records, base => {
              return base.base_code === product;
            });

            if (match) {
              setLow(_.toInteger(match.base_class_dens_lo));
              setHigh(_.toInteger(match.base_class_dens_hi));
            }

            setLoading(false);
          })
        );
      };
      setLoading(true);
      getContext();
    }
  }, [product]);

  const affix = isLoading ? t('messages.calculating') : `${low} - ${high} ${t('units.kgm3')}`;
  const disabled = isLoading || !product;

  return (
    <Form.Item label={t('fields.density')}>
      {getFieldDecorator('tank_density', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={disabled} addonAfter={affix} />)}
    </Form.Item>
  );
};

export default Density;
