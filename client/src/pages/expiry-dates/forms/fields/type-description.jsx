import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TypeDescription = ({ form, value }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_type_desc: value.edt_type_desc
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.typeDescription')}`);
    }

    if (input && input.length > 128) {
      callback(`${t('placeholder.maxCharacters')}: 128 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.typeDescription')}>
      {getFieldDecorator('edt_type_desc', {
        rules: [{ required: true, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default TypeDescription;
