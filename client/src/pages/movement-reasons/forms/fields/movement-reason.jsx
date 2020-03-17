import React, { useEffect } from 'react';
import { Form, InputNumber, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const MovementReason = ({ form, value, send }) => {
  const { t } = useTranslation();

  const validate = (rule, value) => {
    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        mr_mov_type_ori: value.mr_mov_type_ori,
        mr_reason_code_ori: value.mr_reason_code_ori,
        mr_mov_type_rev: value.mr_mov_type_rev,
        mr_reason_code_rev: value.mr_reason_code_rev
      });
    }
  }, [form, value]);

  if (send) {
    return (
      <>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="mr_mov_type_ori"
              label={t('fields.originalMovementType')}
              rules={[{ required: false, validator: validate }]}
            >
              <InputNumber min={-999} max={999} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="mr_reason_code_ori"
              label={t('fields.originalReasonCode')}
              rules={[{ required: false, validator: validate }]}
            >
              <InputNumber min={-999} max={999} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="mr_mov_type_rev"
              label={t('fields.reversalMovementType')}
              rules={[{ required: false, validator: validate }]}
            >
              <InputNumber min={-999} max={999} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="mr_reason_code_rev"
              label={t('fields.reversalReasonCode')}
              rules={[{ required: false, validator: validate }]}
            >
              <InputNumber min={-999} max={999} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }

  return null;
};

export default MovementReason;
