import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Comments = ({ form, value, type, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const IS_DISABLED = disabled || !type;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_comment: value.mlitm_comment
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="mlitm_comment" label={t('fields.comments')}>
      <Input.TextArea disabled={IS_DISABLED} />
    </Form.Item>
  );
};

export default Comments;
