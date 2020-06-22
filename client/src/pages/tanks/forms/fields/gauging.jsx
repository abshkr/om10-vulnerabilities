import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, InputNumber, Row, Col } from 'antd';

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
        tank_instance: value.tank_instance,
        tank_channel: value.tank_channel,
        tank_poll_gap: value.tank_poll_gap,
        tank_address: value.tank_address,
        tank_leakdtct_on: value?.tank_leakdtct_on,
        tank_lvlalarm_desc: value?.tank_lvlalarm_desc,
        tank_group: value?.tank_group,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="tank_identifier" label={t('fields.identifierForGauge')} rules={[{ required: true }]}>
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

      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item name="tank_lvlalarm_desc" label={t('fields.levelAlarmState')}>
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="tank_leakdtct_on" label={t('fields.leakDetection')}>
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="tank_group" label={t('fields.tankGroup')}>
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Gauging;
