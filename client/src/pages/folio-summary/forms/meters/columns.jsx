const columns = t => [
  {
    headerName: t('fields.meterCode'),
    field: 'meter_code',
    sortable: true,
    resizable: true,
    width: 100
  },
  {
    headerName: t('fields.productCode'),
    field: 'stream_basecode',
    sortable: true,
    resizable: true,
    width: 100
  },
  {
    headerName: t('fields.productName'),
    field: 'stream_basename',
    sortable: true,
    resizable: true,
    width: 100
  },
  {
    headerName: t('fields.closingAmbient'),
    field: 'close_amb_tot',
    sortable: true,
    resizable: true,
    editable: true,
    width: 100,
    cellEditor: 'NumericEditor'
  },
  {
    headerName: t('fields.closingMass'),
    field: 'close_mass_tot',
    sortable: true,
    resizable: true,
    width: 100
  },

  {
    headerName: t('fields.litres'),
    field: 'adj_amb_tot',
    sortable: true,
    resizable: true,
    editable: true,
    width: 100,
    cellEditor: 'NumericEditor'
  },

  {
    headerName: t('fields.kg'),
    field: 'adj_mass_tot',
    sortable: true,
    resizable: true,
    width: 100
  },

  {
    headerName: t('fields.adjustmentReason'),
    field: 'adj_description',
    sortable: true,
    resizable: true,
    editable: true,
    width: 300
  },

  {
    headerName: t('fields.gainLossExplanation'),
    field: 'description',
    sortable: true,
    resizable: true,
    editable: true,
    width: 250
  },

  {
    headerName: t('fields.mtrQtyType'),
    field: 'bam_qty_type_str',
    sortable: true,
    resizable: true,
    width: 80
  },

  {
    headerName: t('fields.lastModifiedBy'),
    field: 'user_code',
    sortable: true,
    resizable: true,
    width: 100
  },

  {
    headerName: t('fields.lastModified'),
    field: 'last_chg_time',
    sortable: true,
    resizable: true,
    width: 190,
    cellRenderer: 'DateRenderer'
  }
];

export default columns;
