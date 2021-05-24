import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, InputNumber, Row, Col } from 'antd';
import _ from 'lodash';

const Gauging = ({ form, value, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const limit = rule?.maxLen || 256;
    if (rule?.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const validateNumber = (rule, input) => {
    const min = rule?.minValue || 0;
    const max = rule?.maxValue || 999999999;
    const limit = rule?.maxLen || 256;
    console.log('.............rule', rule);

    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    if (input && _.toNumber(input) < min) {
      return Promise.reject(`${t('placeholder.minNumber')}: ${min} ─ ${t('descriptions.minNumber')}`);
    }

    if (input && _.toNumber(input) > max) {
      return Promise.reject(`${t('placeholder.maxNumber')}: ${max} ─ ${t('descriptions.maxNumber')}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
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
      <Form.Item
        name="tank_identifier"
        label={t('fields.identifierForGauge')}
        rules={[
          {
            required: true,
            validator: validate,
            label: t('fields.identifierForGauge'),
            maxLen: 40,
          },
        ]}
      >
        <Input maxLength={40} />
      </Form.Item>

      <Form.Item
        name="tank_drv_type"
        label={t('fields.interfaceType')}
        rules={[
          {
            required: false,
            validator: validate,
            label: t('fields.interfaceType'),
            maxLen: 6,
          },
        ]}
      >
        <Input maxLength={6} />
      </Form.Item>

      <Form.Item
        name="tank_drv_aux"
        label={t('fields.auxilary')}
        rules={[
          {
            required: false,
            validator: validate,
            label: t('fields.auxilary'),
            maxLen: 40,
          },
        ]}
      >
        <Input maxLength={40} />
      </Form.Item>

      <Form.Item
        name="tank_channel"
        label={t('fields.channel') + ' (0~99)'}
        rules={[
          {
            required: config?.siteMandatoryTankCalcFields,
            validator: validateNumber,
            label: t('fields.channel'),
            minValue: 0,
            maxValue: 99,
            maxLen: 2,
          },
        ]}
      >
        <InputNumber min={0} max={99} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="tank_instance"
        label={t('fields.instance') + ' (0~99)'}
        rules={[
          {
            required: config?.siteMandatoryTankCalcFields,
            validator: validateNumber,
            label: t('fields.instance'),
            minValue: 0,
            maxValue: 99,
            maxLen: 2,
          },
        ]}
      >
        <InputNumber min={0} max={99} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="tank_poll_gap"
        label={t('fields.pollInterval') + ' (0~999999999)'}
        rules={[
          {
            required: config?.siteMandatoryTankCalcFields,
            validator: validateNumber,
            label: t('fields.pollInterval'),
            minValue: 0,
            maxValue: 999999999,
            maxLen: 9,
          },
        ]}
      >
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="tank_address"
        label={t('fields.registerOffset') + ' (0~999999999)'}
        rules={[
          {
            required: config?.siteMandatoryTankCalcFields,
            validator: validateNumber,
            label: t('fields.registerOffset'),
            minValue: 0,
            maxValue: 999999999,
            maxLen: 9,
          },
        ]}
      >
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
