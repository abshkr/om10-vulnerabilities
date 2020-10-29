import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const MessageName = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.messageName')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 128) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 128 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cm_msg_name: value.cm_msg_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cm_msg_name"
      label={t('fields.messageName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default MessageName;
