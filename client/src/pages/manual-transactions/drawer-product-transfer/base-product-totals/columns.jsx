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
    editable: true,
    cellRenderer: 'DensityRenderer',
    cellRendererParams: {
      digits: '1',
    },
  },
  {
    headerName: t('fields.temperature'),
    field: 'trsf_bs_temp_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'TemperatureRenderer',
    cellRendererParams: {
      digits: '1',
    },
  },
  {
    headerName: t('fields.observedQuantity'),
    field: 'trsf_bs_qty_amb_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
 },
  {
    headerName: t('fields.standardQuantity'),
    field: 'trsf_bs_qty_cor_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.massQuantity'),
    field: 'trsf_bs_load_kg_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: 'Additive?',
    field: 'trsf_bs_adtv_flag_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: 'Base Ratio Value',
    field: 'trsf_bs_ratio_value_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: 'Base Ratio Total',
    field: 'trsf_bs_ratio_total_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: 'Base Ratio Total',
    field: 'trsf_bs_ratio_total2_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
];

export default columns;
