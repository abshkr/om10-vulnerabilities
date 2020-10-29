import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const MessageDetails = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > 2048) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 2048 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cm_msg: value.cm_msg,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cm_msg"
      label={t('fields.messageDetails')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input.TextArea />
    </Form.Item>
  );
};

export default MessageDetails;
