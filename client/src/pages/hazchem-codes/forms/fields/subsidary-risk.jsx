import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const SubsidiaryRisk = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        hzcf_sub_risk: value.hzcf_sub_risk,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.subsidiaryRisk')}`);
    }

    if (input && input.length > 20) {
      callback(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.subsidiaryRisk')}>
      {getFieldDecorator('hzcf_sub_risk', {
        rules: [{ required: true, validator: validate }],
      })(<Input />)}
    </Form.Item>
  );
};

export default SubsidiaryRisk;
