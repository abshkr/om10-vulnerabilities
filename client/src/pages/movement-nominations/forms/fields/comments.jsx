import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Comments = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_comments: value.mv_comments
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const len = (new TextEncoder().encode(input)).length;
    if (input && len > 256) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 256 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="mv_comments"
      label={t('fields.comments')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input placeholder={t('placeholder.setComments')} style={{ width: '100%' }} maxLength={256} />
    </Form.Item>
  );
};

export default Comments;
