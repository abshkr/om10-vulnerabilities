import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const MaxKg = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_max_kg: value.tnkr_max_kg,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="tnkr_max_kg"
      label={t('fields.maxKg')}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber min={0} />
    </Form.Item>
  );
};

export default MaxKg;
