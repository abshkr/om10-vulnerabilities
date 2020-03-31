import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Flags = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        adv_lockout: value.adv_lockout,
        adv_pin_pass: value.adv_pin_pass
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Form.Item name="adv_lockout" valuePropName="checked">
        <Checkbox>{t('fields.lockout')}</Checkbox>
      </Form.Item>

      <Form.Item name="adv_pin_pass" valuePropName="checked">
        <Checkbox>{t('fields.pinPassword')}</Checkbox>
      </Form.Item>
    </div>
  );
};

export default Flags;
