import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Comments = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        remarks: value.remarks
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 4000) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4000 ─ ${t('descriptions.maxCharacters')}`);
    }
    return Promise.resolve();
  };

  return (
    <Form.Item name="remarks" label={t('fields.comments')} rules={[{ required: false, validator: validate }]}>
      <Input.TextArea />
    </Form.Item>
  );
};

export default Comments;
