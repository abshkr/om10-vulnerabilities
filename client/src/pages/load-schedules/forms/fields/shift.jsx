import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Shift = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const IS_DISABLED = !value ? false : value?.shls_status !== 'NEW SCHEDULE';

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_shift: value.shls_shift,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shls_shift" label={t('fields.shift')}>
      <InputNumber min={0} max={9} style={{ width: '100%' }} disabled={IS_DISABLED} />
    </Form.Item>
  );
};

export default Shift;
