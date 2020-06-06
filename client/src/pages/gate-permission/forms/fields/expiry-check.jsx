import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Switch } from 'antd';

const ExpiryCheck = ({ value, form }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const onChange = (v) => {
    setFieldsValue({
      rule_expiry_check: v,
    })
  }

  useEffect(() => {
    if (value) {
      setFieldsValue({
        rule_expiry_check: value.rule_expiry_check
      });
    }
  }, [value]);

  return (
    <Form.Item name="rule_expiry_check" label={t('fields.expiryCheck')} valuePropName="checked">
      <Switch checked={value?.rule_expiry_check} onClick={onChange} />
    </Form.Item>
  );
};

export default ExpiryCheck;
