import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { validateField } from '../../../../utils';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_name: value.base_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="base_name"
      label={t('fields.baseProdName')}
      rules={[
        {
          required: true,
          title: t('fields.baseProdName'),
          dataType: 'STRING',
          maxLength: 40,
          precision: null,
          min: null,
          max: null,
          prompts: t,
          // regexp: 'ALPHANUMERIC',
          // regexp: 'DOCUMENT',
          // returnType: 'notice',
          validator: validateField,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default Name;
