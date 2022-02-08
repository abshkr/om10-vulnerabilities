import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Phone = ({ form, value, isMandatory }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_phone: value.per_phone
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="per_phone" label={t('fields.phone')} rules={[{ required: isMandatory }]}>
      <Input />
    </Form.Item>
  );
};

export default Phone;
