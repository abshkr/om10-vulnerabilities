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
    headerName: t('fields.openingAmbient'),
    field: 'trsb_opn_amb',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.closingAmbient'),
    field: 'trsb_cls_amb',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.openingCorrected'),
    field: 'trsb_opn_cor',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.closingCorrected'),
    field: 'trsb_cls_cor',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.openingMass'),
    field: 'trsb_opn_kg',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.closingMass'),
    field: 'trsb_cls_kg',
    sortable: true,
    resizable: true,
  },
];

export default meterColumns;
