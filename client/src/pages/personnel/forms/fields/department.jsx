import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Department = ({ form, value }) => {
  const { t } = useTranslation();
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_department: value.per_department
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 16) {
      callback(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.department')}>
      {getFieldDecorator('per_department', {
        rules: [{ required: false, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default Department;
