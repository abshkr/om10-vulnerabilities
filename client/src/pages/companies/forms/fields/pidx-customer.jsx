import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { REGEX } from '../../../../constants';

const PidxCustomer = ({ form, value, flag }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cmpy_pidx_customer: value.cmpy_pidx_customer,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC_NOSPACE);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumericNoSpace')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 14) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 14 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="cmpy_pidx_customer"
      label={t('fields.cmpyPidxCustomer')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input disabled={!flag} />
    </Form.Item>
  );
};

export default PidxCustomer;
