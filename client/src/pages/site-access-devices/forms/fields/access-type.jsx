import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const AccessType = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        adv_type: value.adv_type
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="adv_type" label={t('fields.accessType')}>
      <Input />
    </Form.Item>
  );
};

export default AccessType;
