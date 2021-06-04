const columns = (t, config) => [
  {
    headerName: t('fields.compartment'),
    field: 'trsf_bs_cmpt_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    width: 50,
  },
  {
    headerName: t('fields.productCode'),
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
    headerName: t('fields.productClass'),
    field: 'trsf_bs_prodcls_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.temperature'),
    field: 'trsf_bs_tank_temp',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.density') + ' (' + t('units.kg/m3') + ')',
    field: 'trsf_bs_den',
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
    field: 'trsf_bs_temp',
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
    field: 'trsf_bs_qty_amb',
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
    field: 'trsf_bs_qty_cor',
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
    field: 'trsf_bs_load_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInVacuum,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.massInAir') + ' (' + t('units.kg') + ')',
    field: 'trsf_bs_air_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInAir,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVolume),
      massInVacuum: 'trsf_bs_load_kg',
      standardVolume: 'trsf_bs_qty_cor',
      factor: config?.airBuoyancyFactor,
    },
  },
  {
    headerName: t('fields.vcf'),
    field: 'trsf_bs_vcf',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteUseVCF,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: config?.precisionVCF,
      min: '0',
    },
  },
  {
    headerName: t('fields.pitemAdtvFlag'),
    field: 'trsf_bs_adtv_flag',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioValue'),
    field: 'trsf_bs_ratio_value',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioTotal'),
    field: 'trsf_bs_ratio_total',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioTotal'),
    field: 'trsf_bs_ratio_total2',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
];

export default columns;
