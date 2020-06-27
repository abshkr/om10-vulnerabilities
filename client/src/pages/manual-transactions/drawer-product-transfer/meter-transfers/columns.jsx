const columns = (t) => [
  /* {
    headerName: t('fields.compartmentNumber'),
    field: 'trsf_cmpt_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    width: 50,
  }, */
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
    headerName: t('fields.openingAmbient'),
    field: 'trsf_mtr_opn_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  {
    headerName: t('fields.closingAmbient'),
    field: 'trsf_mtr_cls_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  {
    headerName: t('fields.openingCorrected'),
    field: 'trsf_mtr_opn_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  {
    headerName: t('fields.closingCorrected'),
    field: 'trsf_mtr_cls_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  {
    headerName: t('fields.openingMass'),
    field: 'trsf_mtr_open_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },

  {
    headerName: t('fields.closingMass'),
    field: 'trsf_mtr_close_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
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
