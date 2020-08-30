const columns = (t) => [
  {
    headerName: t('fields.productCode'),
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
    headerName: t('fields.productClass'),
    field: 'trsf_bs_prodcls_code_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.temperature'),
    field: 'trsf_bs_tank_temp_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.density') + ' (' + t('units.kg/m3') + ')',
    field: 'trsf_bs_den_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    // cellClass: 'editable-ag-grid-cell',
    cellRenderer: 'DensityRenderer',
    cellRendererParams: {
      digits: '1',
    },
  },
  {
    headerName: t('fields.temperature') + ' (' + t('units.degC') + ')',
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
    headerName: t('fields.observedQuantity') + ' (' + t('units.ltr') + ')',
    field: 'trsf_bs_qty_amb_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    // cellClass: 'editable-ag-grid-cell',
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.standardQuantity') + ' (' + t('units.ltr') + ')',
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
    headerName: t('fields.massQuantity') + ' (' + t('units.kg') + ')',
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
    headerName: t('fields.pitemAdtvFlag'),
    field: 'trsf_bs_adtv_flag_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioValue'),
    field: 'trsf_bs_ratio_value_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioTotal'),
    field: 'trsf_bs_ratio_total_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioTotal'),
    field: 'trsf_bs_ratio_total2_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
];

export default columns;
