import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

import { REGEX } from '../../../../constants';

const HostData = ({ form, value, canEdit }) => {
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
    if (input && len > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shl_fleet_data: value.shl_fleet_data,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shl_fleet_data" label={t('fields.hostData')} rules={[{ required: false, validator: validate }]}>
      <Input style={{ width: '100%' }} maxLength={40} disabled={IS_DISABLED || !canEdit} />
    </Form.Item>
  );
};

export default HostData;
