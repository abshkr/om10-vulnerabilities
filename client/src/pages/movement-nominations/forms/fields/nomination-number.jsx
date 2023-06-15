import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { REGEX } from '../../../../constants';

const NominationNumber = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_number: value.mv_number,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const regex = new RegExp(REGEX.ALPHANUMERIC_SPECIAL_NOSQ);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(
        `${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumericSpecialNoSingleQuote')}`
      );
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="mv_number"
      label={t('fields.nominationNumber')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default NominationNumber;
