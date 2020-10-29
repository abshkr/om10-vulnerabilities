import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Department = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_department: value.per_department,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }
    return Promise.resolve();
  };

  return (
    <Form.Item
      name="per_department"
      label={t('fields.department')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default Department;
