import React, { useEffect } from 'react';
import { Form, Checkbox, Divider } from 'antd';
import { useTranslation } from 'react-i18next';

const Flags = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_lock: value.kya_lock,
        kya_adhoc: value.kya_adhoc
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Divider>{t('divider.flags')}</Divider>
      <div style={{ display: 'flex' }}>
        <Form.Item name="kya_lock" valuePropName="checked">
          <Checkbox>{t('fields.locked')}</Checkbox>
        </Form.Item>

        <Form.Item name="kya_adhoc" valuePropName="checked">
          <Checkbox>{t('fields.adhoc')}</Checkbox>
        </Form.Item>

        <Form.Item name="reset_pin" valuePropName="checked">
          <Checkbox>{t('fields.resetPin')}</Checkbox>
        </Form.Item>

        <Form.Item name="remove_pin" valuePropName="checked">
          <Checkbox>{t('fields.removePin')}</Checkbox>
        </Form.Item>
      </div>
    </div>
  );
};

export default Flags;
