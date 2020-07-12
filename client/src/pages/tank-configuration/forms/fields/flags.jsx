import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox, Row, Col } from 'antd';

const Flags = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_exc_pid: value.tank_exc_pid,
        tank_exc_pds: value.tank_exc_pds,
        tank_exc_spmv: value.tank_exc_spmv,
        tank_exc_stckrpt: value.tank_exc_stckrpt
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Row gutter={[8,4]}>
        <Col span={12}>
          <Form.Item name="tank_exc_pid" valuePropName="checked">
            <Checkbox>{t('fields.excludeFromPID')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="tank_exc_spmv" valuePropName="checked">
            <Checkbox>{t('fields.excludeFromSMG')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8,4]}>
        <Col span={12}>
          <Form.Item name="tank_exc_pds" valuePropName="checked">
            <Checkbox>{t('fields.excludeFromPDS')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="tank_exc_stckrpt" valuePropName="checked">
            <Checkbox>{t('fields.excludeFromStockReport')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default Flags;
