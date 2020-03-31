import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Id = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_id: value.eqpt_id
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="eqpt_id" label={t('fields.id')}>
      <Input disabled />
    </Form.Item>
  );
};

export default Id;
