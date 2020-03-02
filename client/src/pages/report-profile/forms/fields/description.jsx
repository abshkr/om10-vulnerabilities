import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Description = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_desc: value.report_desc
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="report_desc"
      label={t('fields.description')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default Description;
