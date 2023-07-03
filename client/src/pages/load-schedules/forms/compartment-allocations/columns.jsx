import React from 'react';
import BooleanRender from './renders/boolean-render';
import DateRender from './renders/date-render';
import SupplierRender from './renders/supplier-render';

const columns = (t, config) => [
  {
    title: t('fields.allocQtyEnough'),
    dataIndex: 'cmpt_alloc_ok',
    key: 'cmpt_alloc_ok',
    width: 160,
    align: 'center',
    render: (text) => BooleanRender(text),
  },

  {
    title: t('fields.compartment'),
    dataIndex: 'compartment',
    key: 'compartment',
    width: 140,
    align: 'center',
  },

  {
    title: t('fields.code'),
    dataIndex: 'prod_code',
    key: 'prod_code',
    width: 120,
    align: 'center',
  },

  {
    title: t('fields.product'),
    dataIndex: 'prod_name',
    key: 'prod_name',
    width: 300,
    align: 'center',
  },

  {
    title: t('fields.schedule'),
    dataIndex: 'qty_scheduled',
    key: 'qty_scheduled',
    width: 100,
    align: 'center',
  },

  {
    title: t('fields.unit'),
    dataIndex: 'unit_name',
    key: 'unit_name',
    width: 100,
    align: 'center',
  },

  {
    title: t('fields.safeFill'),
    dataIndex: 'safefill',
    key: 'safefill',
    width: 110,
    align: 'center',
  },

  {
    title: t('fields.preloaded'),
    dataIndex: 'qty_preload',
    key: 'qty_preload',
    width: 110,
    align: 'center',
  },

  {
    title: t('fields.customer'),
    dataIndex: 'trip_customer',
    key: 'trip_customer',
    width: 240,
    align: 'center',
  },
];

const hideColumns = [];

const showColumns = (t, config) => columns(t, config).filter((o) => hideColumns.indexOf(o?.key) < 0);

export default showColumns;
