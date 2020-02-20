import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Email = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const enabled = getFieldValue('report_canemail') && getFieldValue('report_enabled');

  const validate = (rule, input, callback) => {
    // eslint-disable-next-line
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (input && !regex.exec(input) && enabled) {
      callback(`${t('placeholder.incorrectFormat')} ─ ${t('placeholder.emailInvalid')}`);
    }

    if ((input === '' || !input) && enabled) {
      callback(`${t('validate.set')} ─ ${t('fields.email')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_cmpyemail: value.report_cmpyemail
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.email')} help={t('descriptions.emailDescription')}>
      {getFieldDecorator('report_cmpyemail', {
        rules: [{ required: enabled, validator: validate }]
      })(<Input disabled={!enabled} />)}
    </Form.Item>
  );
};

export default Email;
