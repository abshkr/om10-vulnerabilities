import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const DateTimeFormat = ({ form, value }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_date_fmt: value.edt_date_fmt
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.dateTimeFormat')}>{getFieldDecorator('edt_date_fmt')(<Input />)}</Form.Item>
  );
};

export default DateTimeFormat;
