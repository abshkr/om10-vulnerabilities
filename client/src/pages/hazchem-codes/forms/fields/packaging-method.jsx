import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const PackagingMethod = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        hzcf_pack_method: value.hzcf_pack_method,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.packagingMethod')}`);
    }

    if (input && input.length > 20) {
      callback(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.packagingMethod')}>
      {getFieldDecorator('hzcf_pack_method', {
        rules: [{ required: true, validator: validate }],
      })(<Input />)}
    </Form.Item>
  );
};

export default PackagingMethod;
