import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { JOURNAL } from 'api';

const JournalCategory = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(JOURNAL.CATEGORIES);

  return (
    <Form.Item name="msg_class" label={t('fields.category')}>
      <Select
        loading={isValidating}
        showSearch
        allowClear
        dropdownMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        // placeholder={!value ? t('placeholder.selectSupplier') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.message}>
            {item.message}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default JournalCategory;
