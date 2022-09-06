import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

const TrsaStatus = ({ value, onChange }) => {
  const { t } = useTranslation();

  const options = [
    { code: 'B', text: t('fields.trsaAll') },
    { code: 'A', text: t('fields.trsaActive') },
    { code: 'E', text: t('fields.trsaEnded') },
  ];

  return (
    <Form.Item name="trsa_status" label={t('fields.status')}>
      <Select
        showSearch
        allowClear
        dropdownMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTransStatus') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.map((item, index) => (
          <Select.Option key={index} value={item.code}>
            {item.text}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default TrsaStatus;
