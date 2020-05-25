import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ORDERLISTINGS } from '../../../../api';

const ShipTo = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ORDERLISTINGS.SHIP_TO);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_ship_to_num: value.order_ship_to_num,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_ship_to_num" label={t('fields.orderShipTo')}>
      <Select
        loading={isValidating}
        showSearch
        disabled={false}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectShipTo') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.partner_code}>
            {item.partner_cmpy_name}{!item.partner_cust_name?'':(' - '+item.partner_cust_name)} - {item.partner_code} - {item.partner_name1}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default ShipTo;
