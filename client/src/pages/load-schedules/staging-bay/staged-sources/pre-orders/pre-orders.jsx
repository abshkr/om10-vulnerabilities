import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form } from 'antd';
import api, { STAGING_BAY } from 'api';
import _ from 'lodash';

import { DataTable } from '../../../../../components';
import columns from '../../../columns';
import productColumns from './product-columns';
import SourceRender from '../../../source-render';
import ConvertTraceRender from '../../../convert-trace-render';
import TripStatusRender from '../../../trip-status-render';
import PickupModeRender from '../../../pickup-mode-render';

const PreOrders = ({ value, form, supplier, config }) => {
  const { t } = useTranslation();

  const [trips, setTrips] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  const { data: payload, isValidating, revalidate } = useSWR(
    `${STAGING_BAY.PRE_ORDERS}?supplier=${supplier}`,
    {
      refreshInterval: 0,
    }
  );

  const { data: productsPayload } = useSWR(
    selected
      ? `${STAGING_BAY.TRIP_PRODUCTS}?shls_trip_no=${selected?.shls_trip_no}&supplier_code=${selected?.supplier_code}`
      : null
  );

  const { setFieldsValue } = form;

  const fields = columns(false, t, config);
  const productFields = productColumns(t, config);

  const components = {
    SourceRender,
    ConvertTraceRender,
    TripStatusRender,
    PickupModeRender,
  };

  const handleSelection = (option) => {
    setSelected(option);
  };

  useEffect(() => {
    if (payload) {
      setTrips(payload?.records);
    }
  }, [payload]);

  useEffect(() => {
    if (selected && productsPayload) {
      const list = _.filter(
        productsPayload.records,
        (o) => o?.unit_code !== '' && o?.qty_scheduled !== undefined
      );
      setProducts(list);
      setFieldsValue({
        stage_products: list,
      });
    }
  }, [selected, productsPayload, setFieldsValue]);

  return (
    <>
      <Form.Item name="pre_orders" noStyle>
        <DataTable
          data={trips}
          isLoading={isValidating}
          columns={fields}
          components={components}
          // parentHeight={trips?.length > 0 ? `${trips?.length * 25 + 90}px` : '135px'}
          parentHeight={'135px'}
          minimal
          onClick={(payload) => handleSelection(payload)}
          handleSelect={(payload) => handleSelection(payload[0])}
        />
      </Form.Item>
      {selected && (
        <Form.Item name="stage_products" style={{ marginTop: 10 }}>
          <DataTable
            data={products}
            // isLoading={isValidating}
            columns={productFields}
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

export default PreOrders;
