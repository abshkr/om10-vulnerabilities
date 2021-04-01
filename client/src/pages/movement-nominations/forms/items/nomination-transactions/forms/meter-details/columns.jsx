const columns = (t, pageState, form, arm, config) => [
  {
    headerName: t('fields.nomtranBaseGui'),
    field: 'trsb_bs',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
  },
  {
    headerName: t('fields.nomtranMeterCode'),
    field: 'trsb_meter',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
  },
  {
    headerName: t('fields.meterOpeningAmbient') + ' (' + t('units.ltr') + ')',
    field: 'trsf_opn_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.meterClosingAmbient') + ' (' + t('units.ltr') + ')',
    field: 'trsf_cls_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.observedQuantity') + ' (' + t('units.ltr') + ')',
    field: 'trsf_qty_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.meterOpeningCorrected') + ' (' + t('units.ltr') + ')',
    field: 'trsf_opn_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.meterClosingCorrected') + ' (' + t('units.ltr') + ')',
    field: 'trsf_cls_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.standardQuantity') + ' (' + t('units.ltr') + ')',
    field: 'trsf_qty_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.meterOpeningMass') + ' (' + t('units.kg') + ')',
    field: 'trsf_open_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.meterClosingMass') + ' (' + t('units.kg') + ')',
    field: 'trsf_close_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // editable: pageState === 'disposal' && !!arm ? true : false,
    // cellClass: pageState === 'disposal' && !!arm ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: t('fields.massQuantity') + ' (' + t('units.kg') + ')',
    field: 'trsf_load_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.massInAir') + ' (' + t('units.kg') + ')',
    field: 'trsf_air_kg',
    sortable: true,
    resizable: true,
    hide: !config?.useWaterStrapping,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: '3',
      massInVacuum: 'trsf_load_kg',
      standardVolume: 'trsf_qty_cor',
      factor: config?.airBuoyancyFactor,
    },
  },
];

export default columns;
