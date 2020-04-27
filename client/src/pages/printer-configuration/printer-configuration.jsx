import React from 'react';
import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const PrinterConfiguration = () => {
  const { t } = useTranslation();

  const items = [t('pageNames.physicalPrinters'), t('pageNames.logicalPrinters')];

  return (
    <Row justify="start">
      {items.map((item) => (
        <Col span={6}>
          <Card hoverable title={item} style={{ marginRight: 15 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PrinterConfiguration;
