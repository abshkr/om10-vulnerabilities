import React, { useEffect } from 'react';
import { Form, Checkbox, Row, Col } from 'antd';
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
    // <div style={{ display: 'flex' }}>
    <Row justify="space-around">
      <Col span={4}>
        <Form.Item name="tnkr_lock" label= {t('fields.locked')} valuePropName="checked">
          <Checkbox/>
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item name="tnkr_active"  label= {t('fields.active')} valuePropName="checked">
          <Checkbox/>
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item name="tnkr_bay_loop_ch" label= {t('fields.bayCheck')} valuePropName="checked">
          <Checkbox/>
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item name="tnkr_archive" label= {t('fields.archived')} valuePropName="checked">
          <Checkbox/>
        </Form.Item>
      </Col>
    </Row>
    // </div>
  );
};

export default Locks;
