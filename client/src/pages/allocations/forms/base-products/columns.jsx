const columns = t => [
  {
    headerName: t('fields.productCode'),
    field: 'aitem_prodcode',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.product'),
    field: 'aitem_prodname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.quantityAllocated'),
    field: 'aitem_qtylimit',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    valueParser: params => {
      const { newValue, oldValue } = params;
      const validated = Number(newValue);

      return isNaN(validated) ? oldValue : newValue;
    },
  },
  {
    headerName: t('fields.quantityDelivered'),
    field: 'aitem_qtyused',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.quantityRemained'),
    field: 'aitem_qtyleft',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.productUnit'),
    field: 'aitem_unitname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['l (amb)', 'l (cor)', 'kg'],
    },
  },
  {
    headerName: t('fields.activePeriod'),
    field: 'aitem_perchild',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 160,
  },
];

export default columns;
