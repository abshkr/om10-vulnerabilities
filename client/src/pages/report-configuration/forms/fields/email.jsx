import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Email = ({ form, value, enabled, canEmail, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    /*
      Please do not directly manipulate lets as we try to follow an immutable data flow
      manipulating lets will cause rendering issues and mismatched states
      also because this function was implemented in a promise. all errors to do with the function would be returned as the promise failed.
    */

    const temp_str = input?.replace(':', ';');
    const email_array = temp_str?.split(';') || [];
    // eslint-disable-next-line
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    let invalid_found = false;

    for (let i = 0; i < email_array.length; i++) {
      if (email_array[i] && !regex.exec(email_array[i]) && canEmail) {
        invalid_found = true;
        break;
      }
    }

    if (invalid_found && canEmail) {
      return Promise.reject(`${t('placeholder.incorrectFormat')} ─ ${t('placeholder.emailInvalid')}`);
    }

    if (!input && canEmail) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.email')}`);
    }

    const len = new TextEncoder().encode(input).length;
    // console.log('.........', len, config?.maxLengthEmail, input);
    if (input && len > config?.maxLengthEmail) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthEmail} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_cmpyemail: value.report_cmpyemail,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="report_cmpyemail"
        label={t('fields.reportCmpyemail')}
        rules={[{ required: canEmail, validator: validate }]}
      >
        <Input disabled={!enabled || !canEmail} />
      </Form.Item>
      <span>{t('descriptions.emailDescription')}</span>
    </>
  );
};

export default Email;
