import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const DateTimeFormat = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_date_fmt: value.edt_date_fmt
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="edt_date_fmt" label={t('fields.dateTimeFormat')}>
      <Input />
    </Form.Item>
  );
};

export default DateTimeFormat;
