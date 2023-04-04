import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { PERSONNEL } from 'api';

const PsnlEmployer = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(PERSONNEL.EMPLOYERS);

  return (
    <Form.Item name="psnl_employer" label={t('fields.employer')}>
      <Select
        loading={isValidating}
        showSearch
        allowClear
        dropdownMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEmployer') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default PsnlEmployer;
