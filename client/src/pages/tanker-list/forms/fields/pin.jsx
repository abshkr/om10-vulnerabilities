import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const Pin = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_pin: value.tnkr_pin,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }
    return Promise.resolve();
  };

  return (
    <Form.Item name="tnkr_pin" label={t('fields.pin')} rules={[{ required: false, validator: validate }]}>
      <InputNumber min={0} />
    </Form.Item>
  );
};

export default Pin;
