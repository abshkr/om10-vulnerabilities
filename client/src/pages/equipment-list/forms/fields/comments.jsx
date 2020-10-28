import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Comments = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_comments: value.eqpt_comments,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > 4000) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4000 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="eqpt_comments"
      label={t('fields.comments')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input.TextArea />
    </Form.Item>
  );
};

export default Comments;
