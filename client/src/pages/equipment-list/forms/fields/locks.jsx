import React, { useEffect } from 'react';
import { Form, Checkbox } from 'antd';

const Locks = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_lock: value.eqpt_lock,
        eqp_must_tare_in: value.eqp_must_tare_in
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item style={{ marginTop: 5 }}>
      {getFieldDecorator('eqpt_lock', {
        valuePropName: 'checked'
      })(<Checkbox> {t('fields.locked')} </Checkbox>)}

      {getFieldDecorator('eqp_must_tare_in', {
        valuePropName: 'checked'
      })(<Checkbox> {t('fields.mustTareIn')} </Checkbox>)}
    </Form.Item>
  );
};

export default Locks;
