import React, { useEffect } from 'react';
import { Form, Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const PickupModes = ({ value }) => {
  const { t } = useTranslation();

  const items = [
    { code: '0', name: t('fields.stagingBayNormalLoad') },
    { code: '1', name: t('fields.stagingBayPickupLoad') },
    { code: '2', name: t('fields.stagingBayStagedLoad') },
  ];

  return (
    <Form.Item name="shls_pickup_mode" label={t('fields.stagingBayPickupMode')}>
      <Select disabled={!!value} optionFilterProp="children" placeholder={null} allowClear>
        {items.map((item, index) => (
          <Select.Option key={index} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default PickupModes;
