import React, { useEffect } from 'react';
import { Form, Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { PERSONNEL } from 'api';

const PsnlFlags = ({ value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(PERSONNEL.USER_STATUS);

  const items = [
    { code: 'Y', name: t('operations.yes') },
    { code: 'N', name: t('operations.no') },
  ];

  return (
    <Row gutter={[24, 8]}>
      <Col span={12}>
        <Form.Item name="psnl_lock" label={t('fields.locked')}>
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
        <Form.Item name="psnl_status" label={t('fields.status')}>
          <Select disabled={!!value} optionFilterProp="children" placeholder={null} allowClear>
            {options?.records
              .filter((o) => o.user_status_flag !== '3')
              .map((item, index) => (
                <Select.Option key={index} value={item.user_status_flag}>
                  {item.urer_status_name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
    // </div>
  );
};

export default PsnlFlags;
