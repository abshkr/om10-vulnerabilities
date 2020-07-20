import React, { useEffect } from 'react';
import { Form, Checkbox, Divider, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const Flags = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_lock: value.kya_lock,
        kya_adhoc: value.kya_adhoc
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Row gutter={[8, 0]}>
        <Col span={12}>
          <Form.Item name="kya_lock" valuePropName="checked">
            <Checkbox>{t('fields.locked')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="kya_adhoc" valuePropName="checked">
            <Checkbox>{t('fields.adhoc')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 0]}>
        <Col span={12}>
          <Form.Item name="reset_pin" valuePropName="checked">
            <Checkbox>{t('fields.resetPin')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="remove_pin" valuePropName="checked">
            <Checkbox>{t('fields.removePin')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Flags;
