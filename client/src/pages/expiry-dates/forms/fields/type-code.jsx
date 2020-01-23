import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

const TypeCode = ({ form, value, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_type_code: value.edt_type_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data?.[0].records, ['edt_type_code', input]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.typeCode')}`);
    }

    if (input && match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 32) {
      callback(`${t('placeholder.maxCharacters')}: 32 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.typeCode')}>
      {getFieldDecorator('edt_type_code', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value} />)}
    </Form.Item>
  );
};

export default TypeCode;
