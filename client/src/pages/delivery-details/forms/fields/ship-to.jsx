import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { DELIVERY_DETAILS } from '../../../../api';

const ShipTo = ({ form, value, supplier, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(DELIVERY_DETAILS.SHIP_TO);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_ship_to: value.dd_ship_to,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="dd_ship_to" label={t('fields.ddShipTo')}>
      <Select
        mode="tags"
        loading={isValidating}
        showSearch
        disabled={(pageState==='create'||pageState==='edit')? false : false}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectShipTo') : null}
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

export default ShipTo;
