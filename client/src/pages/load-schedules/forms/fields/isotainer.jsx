import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

import { REGEX } from '../../../../constants';

const Isotainer = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */
  const IS_DISABLED = !value ? false : value?.status !== 'F';
  // const IS_DISABLED = !value ? false : value?.shls_status !== 'NEW SCHEDULE';

  const validate = (rule, input) => {
    const regex = new RegExp(REGEX.ALPHANUMERIC);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('descriptions.mustBeAlphaNumeric')}`);
    }

    const len = (new TextEncoder().encode(input)).length;
    if (input && len > 12) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 12 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_isotainer_num: value.shls_isotainer_num,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shls_isotainer_num" label={t('fields.schdIsotainer')} rules={[{ required: false, validator: validate }]}>
      <Input style={{ width: '100%' }} maxLength={40} disabled={IS_DISABLED} />
    </Form.Item>
  );
};

export default Isotainer;
