import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Comments = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_comments: value.alloc_comments,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > 1000) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 1000 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="alloc_comments"
      label={t('fields.allocComments')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input.TextArea placeholder={t('placeholder.setComments')} style={{ width: '100%' }} maxLength={1000} />
    </Form.Item>
  );
};

export default Comments;
