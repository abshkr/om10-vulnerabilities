import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const DriverLicense = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_licence_no: value.per_licence_no
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="per_licence_no"
      label={t('fields.driveLicence')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default DriverLicense;
