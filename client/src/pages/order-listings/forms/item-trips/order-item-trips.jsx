import React, { useState, useEffect } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  EyeOutlined,
  CarryOutOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { ORDER_LISTINGS } from '../../../../api';

import columns from './columns';

const OrderItemTrips = ({ form, value, config, orderItem, items }) => {
  const [selected, setSelected] = useState(null);
  const [productCode, setProductCode] = useState(orderItem?.oitem_prod_code);
  const [productCompany, setProductCompany] = useState(orderItem?.oitem_prod_cmpy);

  // console.log("I am here!!! ", orderItem);
  // console.log("values: ", value);

  const { t } = useTranslation();
  const fields = columns(t, config);

  const { data: payload, isValidating } = useSWR(
    `${ORDER_LISTINGS.ORDER_ITEM_TRIPS}?oitem_order_id=${value?.order_sys_no}&oitem_prod_code=${productCode}&oitem_prod_cmpy=${productCompany}`
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const handleItemSelect = (options) => {
    setSelected(options);
    //adjustModifiers(options);
  };

  const onChange = (item) => {
    if (!item) {
      setProductCode(undefined);
      setProductCompany(undefined);
    } else {
      const arr = item.split('|');
      console.log('...............items', item, arr);
      setProductCode(arr?.[0]);
      setProductCompany(arr?.[1]);
    }
  };

  useEffect(() => {
    if (orderItem) {
      form.setFieldsValue({
        order_prod_list: orderItem.oitem_prod_code + '|' + orderItem.oitem_prod_cmpy,
      });
    }
  }, [orderItem]);

  return (
    <>
      <Form.Item name="order_prod_list" label={''} rules={[{ required: false }]}>
        <Select
          dropdownMatchSelectWidth={false}
          loading={isValidating}
          showSearch
          allowClear
          onChange={onChange}
          optionFilterProp="children"
          placeholder={t('placeholder.selectDrawerProduct')}
          filterOption={(value, option) =>
            option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
          }
        >
          {items.map((item, index) => (
            <Select.Option key={index} value={item.oitem_prod_code + '|' + item.oitem_prod_cmpy}>
              {item.oitem_prod_code +
                ' - ' +
                item.oitem_prod_name +
                ' [' +
                item.oitem_prod_cmpy +
                ' - ' +
                item.oitem_drwr_name +
                ']'}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="order_trips">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          height="42vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          //apiContext={setTableAPI}
          selectionMode="single"
          //onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default OrderItemTrips;
