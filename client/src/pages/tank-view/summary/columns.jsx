const columns = (t) => [
  {
    headerName: t('fields.productName'),
    field: 'base_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.numberOfTanks'),
    field: 'tank_count',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.totalCapacity'),
    field: 'total_capacity',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.observedQuantity'),
    field: 'observed_quantity',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.ullage'),
    field: 'total_ullage',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.full'),
    field: 'total_fill',
    sortable: true,
    resizable: true,
  },
];

export default columns;
