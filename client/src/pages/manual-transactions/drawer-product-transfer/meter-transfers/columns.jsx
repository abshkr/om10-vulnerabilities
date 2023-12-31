const columns = (t) => [
  {
    headerName: t('fields.compartment'),
    field: 'trsf_cmpt_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    width: 50,
  },
  {
    headerName: t('fields.meter'),
    field: 'trsf_mtr_cd',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.type'),
    field: 'injector_or_meter',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: t('fields.type'),
    field: 'trsf_mtr_typ',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.meterOpeningAmbient') + ' (' + t('units.ltr') + ')',
    field: 'trsf_mtr_opn_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
  },
  {
    headerName: t('fields.meterClosingAmbient') + ' (' + t('units.ltr') + ')',
    field: 'trsf_mtr_cls_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
  },
  {
    headerName: t('fields.meterOpeningCorrected') + ' (' + t('units.ltr') + ')',
    field: 'trsf_mtr_opn_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
  },
  {
    headerName: t('fields.meterClosingCorrected') + ' (' + t('units.ltr') + ')',
    field: 'trsf_mtr_cls_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
  },
  {
    headerName: t('fields.meterOpeningMass') + ' (' + t('units.kg') + ')',
    field: 'trsf_mtr_open_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
  },

  {
    headerName: t('fields.meterClosingMass') + ' (' + t('units.kg') + ')',
    field: 'trsf_mtr_close_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
  },
  // {
  //   headerName: t('fields.observedQuantity'),
  //   field: 'trsf_mtr_amb',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true
  // },
  // {
  //   headerName: t('fields.standardQuantity'),
  //   field: 'trsf_mtr_cor',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true
  // },
  // {
  //   headerName: t('fields.massQuantity'),
  //   field: 'trsf_mtr_mass',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true
  // },
];

export default columns;
