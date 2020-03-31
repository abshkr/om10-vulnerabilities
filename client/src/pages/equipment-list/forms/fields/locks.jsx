import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Locks = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_lock: value.eqpt_lock,
        eqp_must_tare_in: value.eqp_must_tare_in
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div style={{ display: 'flex' }}>
      <Form.Item name="eqpt_lock" style={{ marginTop: 5 }} valuePropName="checked">
        <Checkbox> {t('fields.locked')} </Checkbox>
      </Form.Item>

      <Form.Item name="eqp_must_tare_in" style={{ marginTop: 5 }} valuePropName="checked">
        <Checkbox> {t('fields.mustTareIn')} </Checkbox>
      </Form.Item>
    </div>
  );
};

export default Locks;
