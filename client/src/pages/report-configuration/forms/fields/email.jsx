import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Email = ({ form, value, enabled, canEmail }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const emailEnabled = enabled && canEmail;

  const validate = (rule, input) => {
    // eslint-disable-next-line
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (input && !regex.exec(input) && emailEnabled) {
      return Promise.reject(`${t('placeholder.incorrectFormat')} ─ ${t('placeholder.emailInvalid')}`);
    }

    if (!input && emailEnabled) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.email')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_cmpyemail: value.report_cmpyemail
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="report_cmpyemail"
      label={t('fields.email')}
      rules={[{ required: emailEnabled, validator: validate }]}
    >
      <Input placeholder={!value ? t('descriptions.emailDescription') : null} disabled={!emailEnabled} />
    </Form.Item>
  );
};

export default Email;
