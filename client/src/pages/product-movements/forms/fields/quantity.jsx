import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

const Quantity = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.quantity')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (input !== '' && !invalid && number <= 0) {
      return Promise.reject(`${t('validate.positiveNumber')}`);
    }

    if (decimals > 0) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${0} ─ ${t('descriptions.invalidDecimals')}`
      );
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_intended_qty: value.pmv_intended_qty,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="pmv_intended_qty"
      label={t('fields.quantity')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default Quantity;
