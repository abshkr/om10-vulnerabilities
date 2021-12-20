import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ORDER_LISTINGS } from 'api';

const NominationTerminal = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.TERMINAL);

  return (
    <Form.Item
      name="mv_terminal"
      label={t('fields.terminal')}
    >
      <Select
        loading={isValidating}
        showSearch
        allowClear
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
            {item.term_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default NominationTerminal;
