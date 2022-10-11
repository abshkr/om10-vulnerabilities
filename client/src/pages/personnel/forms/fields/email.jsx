import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Email = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_email: value.per_email,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    // eslint-disable-next-line
    /* const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (input && !regex.exec(input)) {
      return Promise.reject(`${t('placeholder.incorrectFormat')} ─ ${t('placeholder.emailInvalid')}`);
    } */

    const regEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const result = input.replace(/\s/g, '').split(/:|;/);
    for (let i = 0; i < result.length; i++) {
      if (!regEx.test(result[i])) {
        return Promise.reject(`${t('placeholder.incorrectFormat')} ─ ${t('placeholder.emailInvalid')}`);
      }
    }

    if (input && input.length > 254) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 254 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="per_email"
      label={t('fields.email') + ' ' + t('fields.closeoutRptEmailsNote')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default Email;
