import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const PullingLimit = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_max_gross: value.eqpt_max_gross
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
      name="eqpt_max_gross"
      label={`${t('fields.pullingLimit')} (Kg)`}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber min={0} />
    </Form.Item>
  );
};

export default PullingLimit;
