import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { REGEX } from '../../../../constants';

const PidxFein = ({ form, value, flag, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cmpy_pidx_fein: value.cmpy_pidx_fein,
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

    const regex = new RegExp(REGEX.FEIN);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextFein')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="cmpy_pidx_fein"
      label={t('fields.cmpyPidxFein')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input disabled={!flag} onChange={onChange} />
    </Form.Item>
  );
};

export default PidxFein;
