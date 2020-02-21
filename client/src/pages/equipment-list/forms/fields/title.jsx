import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Title = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_title: value.eqpt_title
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.title')}`);
    }

    if (input && input.length > 40) {
      callback(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.title')}>
      {getFieldDecorator('eqpt_title', {
        rules: [{ required: true, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default Title;
