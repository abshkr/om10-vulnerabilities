const meterColumns = (t) => [
  {
    headerName: t('fields.arm'),
    field: 'trsf_baa_code',
    sortable: true,
    resizable: true,
    hide: true,
  },

  {
    headerName: t('fields.meter'),
    field: 'trsb_meter',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.meterOpeningAmbient'),
    field: 'trsb_opn_amb',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.meterClosingAmbient'),
    field: 'trsb_cls_amb',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.meterOpeningCorrected'),
    field: 'trsb_opn_cor',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.meterClosingCorrected'),
    field: 'trsb_cls_cor',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.meterOpeningMass'),
    field: 'trsb_opn_kg',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.meterClosingMass'),
    field: 'trsb_cls_kg',
    sortable: true,
    resizable: true,
  },
];

export default meterColumns;
