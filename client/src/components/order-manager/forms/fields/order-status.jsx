import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { ORDER_LISTINGS } from '../../../../api';
import { Form, Select } from 'antd';

const OrderStatus = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.ORDSTAT_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderStatName')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_stat_id: String(value.order_stat_id),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="order_stat_id"
      label={t('fields.orderStatName')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        disabled={true}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectOrderStatus') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
