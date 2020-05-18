import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, InputNumber } from 'antd';

const Gauging = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value && value.length > 30) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 30 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_identifier: value.tank_identifier,
        tank_drv_type: value.tank_drv_type,
        tank_drv_aux: value.tank_drv_aux,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="tank_identifier"
        label={t('fields.identifierForGauge')}
        rules={[{ required: false, validator: validate }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tank_drv_type"
        label={t('fields.interfaceType')}
        rules={[{ required: false, validator: validate }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tank_drv_aux"
        label={t('fields.auxilary')}
        rules={[{ required: false, validator: validate }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="tank_channel" label={t('fields.channel')}>
        <InputNumber min={0} max={99} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_instance" label={t('fields.instance')}>
        <InputNumber min={0} max={99} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_poll_gap" label={t('fields.pollInterval')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_address" label={t('fields.registerOffset')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
};

export default Gauging;
