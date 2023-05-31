import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form } from 'antd';
import api, { STAGING_BAY } from 'api';
import _ from 'lodash';

import { DataTable } from '../../../../../components';
import columns from '../../../../order-listings/columns';
import itemColumns from './item-columns';

const OpenOrders = ({ value, form, supplier, config }) => {
  const { t } = useTranslation();

  const [trips, setTrips] = useState([]);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const { data: units } = useSWR(STAGING_BAY.UNIT_TYPES);

  const { data: payload, isValidating, revalidate } = useSWR(
    `${STAGING_BAY.OPEN_ORDERS}?supplier=${supplier}`,
    {
      refreshInterval: 0,
    }
  );

  const { data: itemsPayload } = useSWR(
    selected
      ? `${STAGING_BAY.ORDER_ITEMS}?supplier=${selected?.order_supp_code}&order_cust_no=${selected?.order_cust_no}`
      : // ? `${STAGING_BAY.ORDER_ITEMS}?order_sys_no=${selected?.order_sys_no}`
        null
  );

  const { setFieldsValue } = form;

  const fields = columns(t);
  const itemFields = itemColumns(t, 'detail', form, units);

  const handleSelection = (option) => {
    setSelected(option);
  };

  useEffect(() => {
    if (payload) {
      setTrips(payload?.records);
    }
  }, [payload]);

  useEffect(() => {
    if (selected && itemsPayload) {
      // do not use "o?.oitem_prod_qty > 0", because the product quantity ordered could be ZERO
      // when it has defined order product periods and it is not in any periods at the time of checking
      const list = _.filter(
        itemsPayload.records,
        (o) => o?.oitem_order_id !== '' /*&& o?.oitem_prod_qty > 0*/
      );
      setItems(list);
      setFieldsValue({
        stage_items: list,
      });
    }
  }, [selected, itemsPayload, setFieldsValue]);

  return (
    <>
      <Form.Item name="open_orders" style={{ marginTop: 10 }}>
        <DataTable
          data={trips}
          isLoading={isValidating}
          columns={fields}
          // parentHeight={trips?.length > 0 ? `${trips?.length * 25 + 90}px` : '135px'}
          parentHeight={'135px'}
          minimal
          onClick={(payload) => handleSelection(payload)}
          handleSelect={(payload) => handleSelection(payload[0])}
        />
      </Form.Item>
      {selected && (
        <Form.Item name="stage_items" noStyle>
          <DataTable
            data={items}
            // isLoading={isValidating}
            columns={itemFields}
            // components={components}
            // parentHeight={trips?.length > 0 ? `${trips?.length * 25 + 90}px` : '135px'}
            parentHeight={'135px'}
            minimal
            //onClick={(payload) => handleSelection(payload)}
            //handleSelect={(payload) => handleSelection(payload[0])}
          />
        </Form.Item>
      )}
    </>
  );
};

export default OpenOrders;
