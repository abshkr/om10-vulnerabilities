import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';

const SoldTo = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.SOLD_TO);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_sold_to_num: value.shls_sold_to_num,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shls_sold_to_num" label={t('fields.soldTo')}>
      <Select
        loading={isValidating}
        showSearch
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSoldTo') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.partner_code}>
            {item.partner_cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SoldTo;
