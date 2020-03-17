import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const SendToHost = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const handleCheck = e => {
    onChange(e.target.checked);
  };

  useEffect(() => {
    if (value) {
      onChange(true);

      form.setFieldsValue({
        send_to_host: true
      });
    }
  }, [value, onChange]);

  return (
    <Form.Item name="send_to_host" valuePropName="checked">
      <Checkbox onChange={handleCheck}>{t('fields.sendToHost')}</Checkbox>
    </Form.Item>
  );
};

export default SendToHost;
