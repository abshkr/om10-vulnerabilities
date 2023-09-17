const columns = (t, config, form) => [
  {
    headerName: t('fields.compartment'),
    field: 'schd_comp_id',
    resizable: true,
    width: 130,
    suppressSizeToFit: true,
    pinned: 'left',
  },
  {
    headerName: t('fields.drawerProduct'),
    field: 'pitem_prod_desc',
    resizable: true,
    width: 240,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.scheduled'),
    field: 'schd_specqty',
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.baseProduct'),
    field: 'pitem_base_desc',
    resizable: true,
    suppressSizeToFit: true,
    width: 240,
  },
  {
    headerName: t('fields.baseProdManual'),
    field: 'pitem_base_manual',
    filter: 'BooleanFilter',
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    suppressSizeToFit: true,
    width: 120,
  },
  {
    headerName: t('fields.quantityRatioed'),
    field: 'pitem_ratio_qty',
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t(config?.siteLabelUser + 'fields.qtyObs') + ' (' + t('units.ltr') + ')',
    field: 'base_qty_amb',
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    editable: false,
    // cellClass: 'editable-ag-grid-cell',
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVolume),
      min: '100',
      adtvFlag: 'pitem_adtv_flag',
      adtvDigits: config?.precisionAdditive,
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.qtyStd') + ' (' + t('units.ltr') + ')',
    field: 'base_qty_cor',
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVolume),
      min: '100',
      adtvFlag: 'pitem_adtv_flag',
      adtvDigits: config?.precisionAdditive,
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.qtyMass') + ' (' + t('units.kg') + ')',
    field: 'base_load_kg',
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    // hide: !config?.siteMassInVacuum,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionMass),
      min: '100',
      adtvFlag: 'pitem_adtv_flag',
      adtvDigits: config?.precisionAdditive,
    },
  },
  {
    headerName: t('fields.tankCode'),
    field: 'tank_code',
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
    // checkboxSelection: true,
    // headerCheckboxSelection: false,
    // pinned: 'left',
  },
  {
    headerName: t('fields.density') + ' (' + t('units.kg/m3') + ')',
    field: 'tank_density',
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    editable: false,
    // cellClass: 'editable-ag-grid-cell',
    cellRenderer: 'DensityRenderer',
    cellRendererParams: {
      // digits: '1',
      digits: String(config?.precisionDensity),
    },
  },
  {
    headerName: t('fields.temperature') + ' (' + t('units.degC') + ')',
    field: 'tank_temp',
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    cellRenderer: 'TemperatureRenderer',
    cellRendererParams: {
      // digits: '1',
      digits: String(config?.precisionTemperature),
    },
  },
  {
    headerName: t('fields.pitemAdtvFlag'),
    field: 'pitem_adtv_flag',
    filter: 'BooleanFilter',
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    suppressSizeToFit: true,
    width: 130,
  },
  {
    headerName: t('fields.pitemBclassName'),
    field: 'pitem_bclass_desc',
    resizable: true,
    suppressSizeToFit: true,
    width: 240,
  },

  {
    headerName: t('fields.pitemProdCode'),
    field: 'pitem_prod_code',
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.pitemProdName'),
    field: 'pitem_prod_name',
    resizable: true,
    width: 300,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.pitemBaseCode'),
    field: 'pitem_base_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 140,
    hide: true,
  },
  {
    headerName: t('fields.pitemBaseName'),
    field: 'pitem_base_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 180,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioValue'),
    field: 'pitem_ratio_value',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 80,
    hide: true,
  },
  {
    headerName: t('fields.pitemBltolFlag'),
    field: 'pitem_bltol_flag',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    cellRenderer: 'BooleanRenderer',
    width: 180,
    hide: true,
  },
  {
    headerName: t('fields.pitemBltolNtol'),
    field: 'pitem_bltol_ntol',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },
  {
    headerName: t('fields.pitemBltolPtol'),
    field: 'pitem_bltol_ptol',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioSubseq'),
    field: 'pitem_ratio_subseq',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioSeq'),
    field: 'pitem_ratio_seq',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioSubcount'),
    field: 'pitem_ratio_subcount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioCount'),
    field: 'pitem_ratio_count',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioTotal'),
    field: 'pitem_ratio_total',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemBaseGroup'),
    field: 'pitem_base_group',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemBaseGrpname'),
    field: 'pitem_base_grpname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },

  {
    headerName: t('fields.pitemBaseClass'),
    field: 'pitem_base_class',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemBclassName'),
    field: 'pitem_bclass_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },

  {
    headerName: t('fields.pitemBclassDensLo'),
    field: 'pitem_bclass_dens_lo',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },
  {
    headerName: t('fields.pitemBclassDensHi'),
    field: 'pitem_bclass_dens_hi',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },
  {
    headerName: t('fields.pitemBclassVcfAlg'),
    field: 'pitem_bclass_vcf_alg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },
  {
    headerName: t('fields.pitemBclassTempLo'),
    field: 'pitem_bclass_temp_lo',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },
  {
    headerName: t('fields.pitemBclassTempHi'),
    field: 'pitem_bclass_temp_hi',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },
];

export default columns;
