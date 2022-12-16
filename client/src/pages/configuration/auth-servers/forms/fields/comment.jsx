import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Comment = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        as_note: value.as_note,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > 1000) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 1000 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="as_note" label={t('fields.asNote')} rules={[{ required: false, validator: validate }]}>
      <Input.TextArea />
    </Form.Item>
  );
};

export default Comment;
