import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox, Row, Col } from 'antd';

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
    <Row justify="space-around">
      <Col span={12}>
        <Form.Item name="eqpt_lock"  label= {t('fields.locked')} valuePropName="checked">
          <Checkbox/> 
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="eqp_must_tare_in"  label= {t('fields.mustTareIn')} valuePropName="checked">
          <Checkbox/>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Locks;
