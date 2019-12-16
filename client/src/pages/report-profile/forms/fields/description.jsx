import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const Description = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        report_desc: value.report_desc,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 100) {
      callback(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.description')}>
      {getFieldDecorator('report_desc', {
        rules: [{ required: false, validator: validate }],
      })(<Input />)}
    </Form.Item>
  );
};

export default Description;
