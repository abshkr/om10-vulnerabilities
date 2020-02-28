import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Comments = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_comments: value.mv_comments
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
      {getFieldDecorator('mv_comments', {
        rules: [{ required: false, validator: validate }]
      })(<Input.TextArea />)}
    </Form.Item>
  );
};

export default Comments;
