import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TPP = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tpp: value.tpp
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.tpp')} labelCol="">
      {getFieldDecorator('mv_number')(<Input />)}
      {getFieldDecorator('mv_number')(<Input />)}
    </Form.Item>
  );
};

export default TPP;
