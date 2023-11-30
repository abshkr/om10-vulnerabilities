import React, { useEffect } from 'react';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const BayStats = ({ form, value, disabled }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const flags = [
    {
      value: 'I',
      name: t('fields.bayStatsIdle'),
    },
    {
      value: 'L',
      name: t('fields.bayStatsLoading'),
    },
  ];

  useEffect(() => {
    if (value) {
      setFieldsValue({
        stats: value.stats || 'I',
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="stats" label={t('fields.bayStats')}>
      <Select popupMatchSelectWidth={false} allowClear disabled={disabled}>
        {flags.map((item, index) => (
          <Select.Option key={index} value={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BayStats;
