import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const LoadSecurityInformation = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_load_security_info: value?.shls_load_security_info,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="shls_load_security_info" label={t('fields.loadSecurityInformation')}>
        <Input.TextArea disabled />
      </Form.Item>
    </>
  );
};

export default LoadSecurityInformation;
