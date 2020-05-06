import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const EmptyWeight = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_empty_kg: value.eqpt_empty_kg,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 126) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 126 ─ ${t('descriptions.maxCharacters')}`);
    }
    return Promise.resolve();
  };

  return (
    <Form.Item
      name="eqpt_empty_kg"
      label={`${t('fields.emptyWeight')} (Kg)`}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber min={0} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default EmptyWeight;
