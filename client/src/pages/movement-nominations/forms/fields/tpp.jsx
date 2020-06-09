import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Row, Col } from 'antd';

const TPP = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_tppoint: value.mv_tppoint,
        mv_tpp_text: value.mv_tpp_text,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Row gutter={[12, 3]}>
      <Col span={6}>
        <Form.Item name="mv_tppoint" label={t('fields.tpp')}>
          <Input placeholder={t('placeholder.setTPPCode')} style={{ width: '100%' }} maxLength={16} />
        </Form.Item>
      </Col>

      <Col span={18}>
        <Form.Item name="mv_tpp_text" label={t('fields.tppDescription')}>
          <Input placeholder={t('placeholder.setTPPDescription')} style={{ width: '100%' }} maxLength={256} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default TPP;
