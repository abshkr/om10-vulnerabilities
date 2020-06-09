const columns = (t) => [
  {
    headerName: t('fields.meter'),
    field: 'meter_injector_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.type'),
    field: 'type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.openingAmbient'),
    field: 'open_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  {
    headerName: t('fields.closingAmbient'),
    field: 'close_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  {
    headerName: t('fields.openingCorrected'),
    field: 'open_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  {
    headerName: t('fields.closingCorrected'),
    field: 'close_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  {
    headerName: t('fields.openingMass'),
    field: 'open_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },

  {
    headerName: t('fields.closingMass'),
    field: 'close_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: 'NumericEditor',
  },
  // {
  //   headerName: t('fields.temperature'),
  //   field: 'mtd_amb',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true
  // },
  // {
  //   headerName: t('fields.observedQuantity'),
  //   field: 'mtd_cor',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true
  // },
  // {
  //   headerName: t('fields.standardQuantity'),
  //   field: 'mtd_poll',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true
  // },
  // {
  //   headerName: t('fields.massQuantity'),
  //   field: 'mtd_poll',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true
  // }
];

export default columns;
