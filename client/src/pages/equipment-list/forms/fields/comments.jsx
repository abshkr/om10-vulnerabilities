import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const Comments = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_comments: value.eqpt_comments
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 4000) {
      callback(`${t('placeholder.maxCharacters')}: 4000 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.comments')}>
      {getFieldDecorator('eqpt_comments', {
        rules: [{ required: false, validator: validate }]
      })(<Input.TextArea />)}
    </Form.Item>
  );
};

export default Comments;
