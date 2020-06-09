const columns = (t) => [
  {
    headerName: t('fields.product'),
    field: 'product',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankCode'),
    field: 'tank_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.productClass'),
    field: 'stream_bclass_nmae',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.density'),
    field: 'dens',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temperature'),
    field: 'temperature',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.observedQuantity'),
    field: 'amb_vol',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standardQuantity'),
    field: 'cor_vol',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.massQuantity'),
    field: 'liq_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
