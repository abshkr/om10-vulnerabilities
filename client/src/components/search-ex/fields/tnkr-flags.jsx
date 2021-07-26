import React, { useEffect } from 'react';
import { Form, Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const TnkrFlags = ({ value }) => {
  const { t } = useTranslation();

  const items = [
    { code: 'Y', name: t('operations.yes') },
    { code: 'N', name: t('operations.no') },
  ];

  return (
    <Row gutter={[24, 8]}>
      <Col span={12}>
        <Form.Item name="tnkr_lock" label={t('fields.locked')}>
          <Select disabled={!!value} optionFilterProp="children" placeholder={null} allowClear>
            {items.map((item, index) => (
              <Select.Option key={index} value={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="tnkr_active" label={t('fields.active')}>
          <Select disabled={!!value} optionFilterProp="children" placeholder={null} allowClear>
            {items.map((item, index) => (
              <Select.Option key={index} value={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
    // </div>
  );
};

export default TnkrFlags;
