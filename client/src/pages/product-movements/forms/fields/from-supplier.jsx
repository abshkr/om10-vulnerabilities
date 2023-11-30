import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from 'api';

const Supplier = ({ value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.SUPPLIERS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.fromSupplier')}`);
      }
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="from_supplier"
      label={t('fields.fromSupplier')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        allowClear
        showSearch
        popupMatchSelectWidth={false}
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
