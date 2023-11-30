import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ORDER_LISTINGS } from 'api';

const OrderStatus = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.ORDSTAT_TYPES);

  return (
    <Form.Item name="order_stat_id" label={t('fields.orderStatName')}>
      <Select
        loading={isValidating}
        showSearch
        allowClear
        popupMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectOrderStatus') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.ordstat_type_id}>
            {item.ordstat_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default OrderStatus;
