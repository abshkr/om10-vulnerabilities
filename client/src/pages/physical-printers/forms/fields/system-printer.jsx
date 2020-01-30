import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const SystemPrinter = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.sysPrinter')}`);
    }

    if (input && input.length > 30) {
      callback(`${t('placeholder.maxCharacters')}: 30 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        sys_prntr: value.sys_prntr
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.sysPrinter')}>
      {getFieldDecorator('sys_prntr', {
        rules: [{ required: true, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default SystemPrinter;
