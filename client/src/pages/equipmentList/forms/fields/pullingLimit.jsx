import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';

const PullingLimit = ({ form, value, t, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_max_gross: value.eqpt_max_gross
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
    <Form.Item label={t('fields.pullingLimit')}>
      {getFieldDecorator('eqpt_max_gross', {
        rules: [{ required: false, validator: validate }]
      })(<InputNumber />)}
    </Form.Item>
  );
};

export default PullingLimit;
