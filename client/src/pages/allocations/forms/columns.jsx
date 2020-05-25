const columns = (t, isCreating, form, units) => [
  {
    headerName: t('fields.productCode'),
    field: 'aitem_prodcode',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 180,
  },
  {
    headerName: t('fields.product'),
    field: 'aitem_prodname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 130,
  },
  {
    headerName: t('fields.quantityAllocated'),
    field: 'aitem_qtylimit',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
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
    cellEditor: 'UnitEditor',
    width: 130,
    cellEditorParams: {
      values: units?.records,
      form: form,
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
