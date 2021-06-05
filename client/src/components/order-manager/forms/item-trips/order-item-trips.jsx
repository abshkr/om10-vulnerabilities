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
import { Button, Form } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { ORDER_LISTINGS } from '../../../../api';

import columns from './columns';

const OrderItemTrips = ({ value, config, orderItem }) => {
  const [selected, setSelected] = useState(null);

  console.log('I am here!!! ', orderItem);
  console.log('values: ', value);

  const { t } = useTranslation();
  const fields = columns(t, config);

  const { data: payload, isValidating } = useSWR(
    `${ORDER_LISTINGS.ORDER_ITEM_TRIPS}?oitem_order_id=${orderItem?.oitem_order_id}&oitem_prod_code=${orderItem?.oitem_prod_code}&oitem_prod_cmpy=${orderItem?.oitem_prod_cmpy}`
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const handleItemSelect = (options) => {
    setSelected(options);
    //adjustModifiers(options);
  };

  return (
    <>
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
