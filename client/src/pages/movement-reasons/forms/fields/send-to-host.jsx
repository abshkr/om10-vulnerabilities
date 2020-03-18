import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const SendToHost = ({ form, value, onChange }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const handleCheck = e => {
    onChange(e.target.checked);
  };

  useEffect(() => {
    if (value) {
      onChange(true);

      setFieldsValue({
        send_to_host: true
      });
    }
  }, [value, onChange, setFieldsValue]);

  return (
    <Form.Item name="send_to_host" valuePropName="checked">
      <Checkbox onChange={handleCheck}>{t('fields.sendToHost')}</Checkbox>
    </Form.Item>
  );
};

export default SendToHost;
