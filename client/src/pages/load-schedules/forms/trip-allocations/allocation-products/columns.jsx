const columns = (t) => [
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
];

const hideColumns = [
  // 'aitem_prodcode',
  // 'aitem_prodname',
  // 'aitem_qtylimit',
  // 'aitem_qtyused',
  // 'aitem_qtyleft',
  // 'aitem_unitname',
  // 'aitem_perchild',
];

const showColumns = (t) => columns(t).filter((o) => hideColumns.indexOf(o?.key) < 0);

export default showColumns;
