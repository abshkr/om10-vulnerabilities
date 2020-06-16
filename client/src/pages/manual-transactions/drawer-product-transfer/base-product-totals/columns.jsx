const columns = (t) => [
  {
    headerName: t('fields.product'),
    field: 'trsf_bs_prodcd_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.product'),
    field: 'trsf_bs_prodname_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankCode'),
    field: 'trsf_bs_tk_cd_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.productClass'),
    field: 'trsf_bs_prodcls_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.density'),
    field: 'trsf_bs_den_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temperature'),
    field: 'trsf_bs_temp_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.observedQuantity'),
    field: 'trsf_bs_qty_amb_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standardQuantity'),
    field: 'trsf_bs_qty_cor_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.massQuantity'),
    field: 'trsf_bs_load_kg_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;