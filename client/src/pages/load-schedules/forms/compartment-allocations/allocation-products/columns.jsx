import React from 'react';
import BooleanRender from '../renders/boolean-render';
import DateRender from '../renders/date-render';
import SupplierRender from '../renders/supplier-render';

const columns = (t, config) => [
  {
    title: t('fields.schedule'),
    dataIndex: 'aitem_qty_scheduled',
    key: 'aitem_qty_scheduled',
    width: 100,
    align: 'center',
  },

  {
    title: t('fields.preloaded'),
    dataIndex: 'aitem_qty_preload',
    key: 'aitem_qty_preload',
    width: 110,
    align: 'center',
  },

  {
    title: t('fields.allocQtyEnough'),
    dataIndex: 'aitem_qty_enough',
    key: 'aitem_qty_enough',
    width: 160,
    align: 'center',
    render: (text) => BooleanRender(text),
  },

  {
    title: t('fields.productCode'),
    dataIndex: 'aitem_prodcode',
    key: 'aitem_prodcode',
    width: 150,
    align: 'center',
  },

  {
    title: t('fields.product'),
    dataIndex: 'aitem_prodname',
    key: 'aitem_prodname',
    width: 170,
    align: 'center',
  },

  {
    title: t('fields.quantityAllocated'),
    dataIndex: 'aitem_qtylimit',
    key: 'aitem_qtylimit',
    width: 160,
    align: 'center',
  },

  {
    title: t('fields.quantityDelivered'),
    dataIndex: 'aitem_qtyused',
    key: 'aitem_qtyused',
    width: 120,
    align: 'center',
  },

  {
    title: t('fields.quantityRemained'),
    dataIndex: 'aitem_qtyleft',
    key: 'aitem_qtyleft',
    width: 120,
    align: 'center',
  },

  {
    title: t('fields.productUnit'),
    dataIndex: 'aitem_unitname',
    key: 'aitem_unitname',
    width: 130,
    align: 'center',
  },

  {
    title: t('fields.activePeriod'),
    dataIndex: 'aitem_perchild',
    key: 'aitem_perchild',
    width: 160,
    align: 'center',
  },

  // alocation columns
  {
    title: t('fields.allocIndex'),
    dataIndex: 'alloc_index',
    key: 'alloc_index',
    width: 80,
    align: 'center',
  },

  {
    title: t('fields.allocType'),
    dataIndex: 'alloc_type',
    key: 'alloc_type',
    width: 140,
    align: 'center',
  },

  {
    title: t('fields.allocTypeName'),
    dataIndex: 'alloc_typename',
    key: 'alloc_typename',
    width: 140,
    align: 'center',
  },

  {
    title: t('fields.allocTypeDesc'),
    dataIndex: 'alloc_typedesc',
    key: 'alloc_typedesc',
    width: 180,
    align: 'center',
  },

  {
    title: t('fields.allocCmpycode'),
    dataIndex: 'alloc_cmpycode',
    key: 'alloc_cmpycode',
    width: 140,
    align: 'center',
  },

  {
    title: t('fields.allocCmpyName'),
    dataIndex: 'alloc_cmpyname',
    key: 'alloc_cmpyname',
    width: 200,
    align: 'center',
  },

  {
    title: t('fields.allocCmpyDesc'),
    dataIndex: 'alloc_cmpydesc',
    key: 'alloc_cmpydesc',
    width: 320,
    align: 'center',
  },

  {
    title: t('fields.allocBaseFlag'),
    dataIndex: 'alloc_baseflag',
    key: 'alloc_baseflag',
    width: 160,
    align: 'center',
    render: (text) => BooleanRender(text),
  },

  {
    title: t('fields.allocSuppcode'),
    dataIndex: 'alloc_suppcode',
    key: 'alloc_suppcode',
    width: 140,
    align: 'center',
    render: (text, record) => (
      <div style={{ width: '100%', display: 'flex' }}>
        {SupplierRender(record, 'alloc_type', ['1', '3'], 'alloc_suppcode', 'alloc_ownercode')}
      </div>
    ),
  },

  {
    title: t('fields.allocSuppName'),
    dataIndex: 'alloc_suppname',
    key: 'alloc_suppname',
    width: 200,
    align: 'center',
    render: (text, record) => (
      <div style={{ width: '100%', display: 'flex' }}>
        {SupplierRender(record, 'alloc_type', ['1', '3'], 'alloc_suppname', 'alloc_ownername')}
      </div>
    ),
  },

  {
    title: t('fields.allocSuppDesc'),
    dataIndex: 'alloc_suppdesc',
    key: 'alloc_suppdesc',
    width: 320,
    align: 'center',
    render: (text, record) => (
      <div style={{ width: '100%', display: 'flex' }}>
        {SupplierRender(record, 'alloc_type', ['1', '3'], 'alloc_suppdesc', 'alloc_ownerdesc')}
      </div>
    ),
  },

  {
    title: t('fields.allocLock'),
    dataIndex: 'alloc_lock',
    key: 'alloc_lock',
    width: 140,
    align: 'center',
  },

  {
    title: t('fields.allocLockName'),
    dataIndex: 'alloc_lockname',
    key: 'alloc_lockname',
    width: 140,
    align: 'center',
  },

  {
    title: t('fields.allocLockDesc'),
    dataIndex: 'alloc_lockdesc',
    key: 'alloc_lockdesc',
    width: 150,
    align: 'center',
  },

  {
    title: t('fields.allocPeriod'),
    dataIndex: 'alloc_period',
    key: 'alloc_period',
    width: 140,
    align: 'center',
  },

  {
    title: t('fields.allocPeriodName'),
    dataIndex: 'alloc_periodname',
    key: 'alloc_periodname',
    width: 140,
    align: 'center',
  },

  {
    title: t('fields.allocPeriodDesc'),
    dataIndex: 'alloc_perioddesc',
    key: 'alloc_perioddesc',
    width: 150,
    align: 'center',
  },

  {
    title: t('fields.allocStartDate'),
    dataIndex: 'alloc_start_date',
    key: 'alloc_start_date',
    width: 180,
    align: 'center',
    render: (text) => DateRender({ value: text, dateTimeFormat: config?.dateTimeFormat }),
  },

  {
    title: t('fields.allocEndDate'),
    dataIndex: 'alloc_end_date',
    key: 'alloc_end_date',
    width: 180,
    align: 'center',
    render: (text) => DateRender({ value: text, dateTimeFormat: config?.dateTimeFormat }),
  },

  {
    title: t('fields.allocNextDate'),
    dataIndex: 'alloc_next_date',
    key: 'alloc_next_date',
    width: 180,
    align: 'center',
    render: (text) => DateRender({ value: text, dateTimeFormat: config?.dateTimeFormat }),
  },

  {
    title: t('fields.allocDatetime'),
    dataIndex: 'alloc_datetime',
    key: 'alloc_datetime',
    width: 180,
    align: 'center',
    render: (text) => DateRender({ value: text, dateTimeFormat: config?.dateTimeFormat }),
  },
];

const hideColumns = [
  'aitem_qty_scheduled',
  'aitem_qty_preload',
  // 'aitem_qty_enough',
  // 'aitem_prodcode',
  // 'aitem_prodname',
  // 'aitem_qtylimit',
  // 'aitem_qtyused',
  // 'aitem_qtyleft',
  // 'aitem_unitname',
  'aitem_perchild',
  // 'alloc_index',
  'alloc_type',
  'alloc_typename',
  // 'alloc_typedesc',
  'alloc_cmpycode',
  'alloc_cmpyname',
  // 'alloc_cmpydesc',
  // 'alloc_baseflag',
  'alloc_suppcode',
  'alloc_suppname',
  // 'alloc_suppdesc',
  'alloc_lock',
  'alloc_lockname',
  // 'alloc_lockdesc',
  'alloc_period',
  'alloc_periodname',
  // 'alloc_perioddesc',
  // 'alloc_start_date',
  // 'alloc_end_date',
  // 'alloc_next_date',
  // 'alloc_datetime',
];

const showColumns = (t, config) => columns(t, config).filter((o) => hideColumns.indexOf(o?.key) < 0);

export default showColumns;
