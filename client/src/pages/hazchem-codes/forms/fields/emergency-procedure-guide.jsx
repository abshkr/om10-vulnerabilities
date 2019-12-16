import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const EmergencyProcedureGuide = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        hzcf_emrg: value.hzcf_emrg,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.emergencyProcedureGuide')}`);
    }

    if (input && input.length > 20) {
      callback(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.emergencyProcedureGuide')}>
      {getFieldDecorator('hzcf_emrg', {
        rules: [{ required: true, validator: validate }],
      })(<Input />)}
    </Form.Item>
  );
};

export default EmergencyProcedureGuide;
