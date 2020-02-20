import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const DriverLicense = ({ form, value }) => {
  const { t } = useTranslation();
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_licence_no: value.per_licence_no
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 40) {
      callback(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.driveLicence')}>
      {getFieldDecorator('per_licence_no', {
        rules: [{ required: false, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default DriverLicense;
