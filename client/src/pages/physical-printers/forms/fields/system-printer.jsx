import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const SystemPrinter = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.sysPrinter')}`);
    }

    if (value && value.length > 30) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 30 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        sys_prntr: value.sys_prntr
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="sys_prntr"
      label={t('fields.sysPrinter')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default SystemPrinter;
