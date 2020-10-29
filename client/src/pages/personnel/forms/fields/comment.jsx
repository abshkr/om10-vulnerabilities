import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const DriverLicense = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_comments: value.per_comments,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > 4000) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4000 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="per_comments"
      label={t('fields.comments')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input.TextArea />
    </Form.Item>
  );
};

export default DriverLicense;
