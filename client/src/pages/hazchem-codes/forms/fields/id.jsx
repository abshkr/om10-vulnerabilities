import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import _ from 'lodash';

const Id = ({ form, value, t, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        hzcf_id: value.hzcf_id,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data, ['hzcf_id', input]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.id')}`);
    }

    if (input && !!match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 20) {
      callback(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.id')}>
      {getFieldDecorator('hzcf_id', {
        rules: [{ required: true, validator: validate }],
      })(<Input disabled={!!value} />)}
    </Form.Item>
  );
};

export default Id;
