import React, { useState } from 'react';

import useSWR from 'swr';
import { Form, Button, Modal, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { ON_DEMAND_REPORTS } from 'api';
import { DataTable } from 'components';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const columns = (t, enabled) => [
  {
    headerName: '',
    field: 'selected',
    hide: !enabled,
    suppressSizeToFit: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 100,
  },
  {
    headerName: t('fields.drawerCode'),
    field: 'prod_cmpy',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 280,
    // hide: true,
  },
  {
    headerName: t('fields.drawer'),
    field: 'supplier_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 360,
    // hide: true,
  },
  {
    headerName: t('fields.prodCode'),
    field: 'prod_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 280,
  },
  {
    headerName: t('fields.prodName'),
    field: 'prod_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 480,
    // hide: true,
  },
];

const Product = ({ form, supplier, enabled, onChange }) => {
  const { t } = useTranslation();

  const { data: payload } = useSWR(`${ON_DEMAND_REPORTS.PRODUCTS}?supplier_code=${supplier}`);

  const handleSelect = (v) => {
    console.log('..........products', v);
    if (enabled && onChange) {
      onChange(v);
    }
  };

  return (
    <Form.Item form={form} name="products" label={t('fields.drawerProduct')}>
      <DataTable
        data={payload?.records}
        // height="20vh"
        parentHeight={enabled ? '272px' : '100px'}
        minimal
        columns={columns(t, enabled)}
        // onClick={(payload) => handleSelect(payload)}
        handleSelect={(payload) => handleSelect(payload)}
      />
    </Form.Item>
  );
};

export default Product;
