import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from 'api';

const Supplier = ({ value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.SUPPLIERS);

  return (
    <Form.Item
      name="supplier"
      label={t('fields.supplier')}
      rules={[{ required: true }]}
    >
      <Select
        loading={isValidating}
        showSearch
        dropdownMatchSelectWidth={false}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSupplier') : null}
        // filterOption={(value, option) =>
        //   option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        // }
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

export default Supplier;
