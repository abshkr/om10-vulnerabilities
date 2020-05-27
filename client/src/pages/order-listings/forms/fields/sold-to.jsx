import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ORDER_LISTINGS } from '../../../../api';

const SoldTo = ({ form, value, supplier }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.SOLD_TO);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_sold_to_num: value.order_sold_to_num,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_sold_to_num" label={t('fields.orderSoldTo')}>
      <Select
        loading={isValidating}
        showSearch
        disabled={false}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSoldTo') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.filter((item)=>(!value?(item.partner_cmpy_code===''):(item.partner_cmpy_code===supplier))).map((item, index) => (
          <Select.Option key={index} value={item.partner_code}>
            {item.partner_cmpy_name}{!item.partner_cust_name?'':(' - '+item.partner_cust_name)} - {item.partner_code} - {item.partner_name1}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SoldTo;
