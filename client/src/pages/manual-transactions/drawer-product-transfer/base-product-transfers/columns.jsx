const columns = (t) => [
  {
    headerName: t('fields.product'),
    field: 'trsf_bs_prodcd',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.product'),
    field: 'trsf_bs_prodname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankCode'),
    field: 'trsf_bs_tk_cd',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.productClass'),
    field: 'trsf_bs_prodcls',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.density'),
    field: 'trsf_bs_den',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temperature'),
    field: 'trsf_bs_temp',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.observedQuantity'),
    field: 'trsf_bs_qty_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standardQuantity'),
    field: 'trsf_bs_qty_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.massQuantity'),
    field: 'trsf_bs_load_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
