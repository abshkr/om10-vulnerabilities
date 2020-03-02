import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Flags = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_default: value.edt_default,
        edt_status: value.edt_status,
        edt_reject: value.edt_reject,
        edt_time_enabled: value.edt_time_enabled
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Form.Item name="edt_default" valuePropName="checked">
        <Checkbox disabled>{t('fields.default')}</Checkbox>
      </Form.Item>

      <Form.Item name="edt_status" valuePropName="checked">
        <Checkbox>{t('fields.enabled')}</Checkbox>
      </Form.Item>

      <Form.Item name="edt_reject" valuePropName="checked">
        <Checkbox>{t('fields.rejectAuthorization')}</Checkbox>
      </Form.Item>

      <Form.Item name="edt_time_enabled" valuePropName="checked">
        <Checkbox>{t('fields.timeEnabled')}</Checkbox>
      </Form.Item>
    </div>
  );
};

export default Flags;
