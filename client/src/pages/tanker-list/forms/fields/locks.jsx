import React, { useEffect } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const Locks = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_lock: value.tnkr_lock,
        tnkr_active: value.tnkr_active,
        tnkr_bay_loop_ch: value.tnkr_bay_loop_ch,
        tnkr_archive: value.tnkr_archive
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div style={{ display: 'flex' }}>
      <Form.Item name="tnkr_lock" style={{ marginTop: 10 }} valuePropName="checked">
        <Checkbox> {t('fields.locked')} </Checkbox>
      </Form.Item>

      <Form.Item name="tnkr_active" style={{ marginTop: 10 }} valuePropName="checked">
        <Checkbox> {t('fields.active')} </Checkbox>
      </Form.Item>

      <Form.Item name="tnkr_bay_loop_ch" style={{ marginTop: 10 }} valuePropName="checked">
        <Checkbox> {t('fields.bayCheck')} </Checkbox>
      </Form.Item>

      <Form.Item name="tnkr_archive" style={{ marginTop: 10 }} valuePropName="checked">
        <Checkbox> {t('fields.archived')} </Checkbox>
      </Form.Item>
    </div>
  );
};

export default Locks;
