import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SITE_CONFIGURATION } from 'api';

const Terminal = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(SITE_CONFIGURATION.TERMINALS);

  return (
    <Form.Item name="terminal" label={t('fields.terminal')}>
      <Select
        loading={isValidating}
        showSearch
        allowClear
        popupMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTerminal') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={item.term_code}>
            {item.term_code} - {item.term_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Terminal;
