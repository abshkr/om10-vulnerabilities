import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Row, Col } from 'antd';

const TransportMode = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_tpmode: value.mv_tpmode,
        mv_tpmode_text: value.mv_tpmode_text,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Row gutter={[12, 3]}>
      <Col span={6}>
        <Form.Item name="mv_tpmode" label={t('fields.transportMode')}>
          <Input placeholder={t('placeholder.setTransportMode')} style={{ width: '100%' }} maxLength={16}/>
        </Form.Item>
      </Col>

      <Col span={18}>
        <Form.Item name="mv_tpmode_text" label={t('fields.transportModeDescription')}>
          <Input placeholder={t('placeholder.setTransportModeDescription')} style={{ width: '100%' }} maxLength={256} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default TransportMode;
