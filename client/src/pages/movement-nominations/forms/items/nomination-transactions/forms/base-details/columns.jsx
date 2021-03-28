const columns = (t, pageState, form, arm, config) => [
  /* {
    headerName: t('fields.nomtranBaseGui'),
    field: 'trsf_bs_prodcd',
    //field: 'trsb_bs',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
  },
  {
    headerName: t('fields.nomtranTankCode'),
    field: 'trsf_bs_tk_cd',
    //field: 'trsb_tk_tankcode',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
  },
  {
    headerName: t('fields.nomtranBclassDesc'),
    field: 'trsf_bs_prodcls',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
  },
  {
    headerName: t('fields.nomtranTankDens'),
    field: 'trsf_bs_den',
    //field: 'trsb_dns',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: pageState === 'disposal' && !!arm ? true : false,
    cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.nomtranTemperature'),
    field: 'trsf_bs_temp',
    //field: 'trsb_tmp',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
  },
  {
    headerName: t('fields.nomtranAmbVol'),
    field: 'trsf_bs_qty_amb',
    //field: 'trsb_avl',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: pageState === 'disposal' && !!arm ? true : false,
    cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.nomtranCorVol'),
    field: 'trsf_bs_qty_cor',
    //field: 'trsb_cvl',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: pageState === 'disposal' && !!arm ? true : false,
    cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.nomtranLiqKg'),
    field: 'trsf_bs_load_kg',
    //field: 'trsb_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: pageState === 'disposal' && !!arm ? true : false,
    cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  }, */

  {
    headerName: t('fields.compartment'),
    field: 'trsf_bs_cmpt_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    width: 50,
  },
  {
    headerName: t('fields.productCode'),
    field: 'trsf_bs_prodcd',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.nomtranBaseGui'),
    // headerName: t('fields.product'),
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
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
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
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
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
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
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
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
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
    hide: !config?.useWaterStrapping,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: '3',
      massInVacuum: 'trsf_bs_load_kg',
      standardVolume: 'trsf_bs_qty_cor',
    },
  },
  {
    headerName: 'Additive?',
    field: 'trsf_bs_adtv_flag',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: 'Base Ratio Value',
    field: 'trsf_bs_ratio_value',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: 'Base Ratio Total',
    field: 'trsf_bs_ratio_total',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: 'Base Ratio Total',
    field: 'trsf_bs_ratio_total2',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
];

export default columns;
