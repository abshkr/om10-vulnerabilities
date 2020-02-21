import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const EmptyWeight = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_empty_kg: value.eqpt_empty_kg
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 126) {
      callback(`${t('placeholder.maxCharacters')}: 126 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={`${t('fields.emptyWeight')} (Kg)`}>
      {getFieldDecorator('eqpt_empty_kg', {
        rules: [{ required: false, validator: validate }]
      })(<InputNumber min={0} />)}
    </Form.Item>
  );
};

export default EmptyWeight;
