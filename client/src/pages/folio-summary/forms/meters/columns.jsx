const columns = (t) => [
  {
    headerName: t('fields.meterCode'),
    field: 'meter_code',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    pinned: 'left',
  },
  {
    headerName: t('fields.productCode'),
    field: 'stream_basecode',
    sortable: true,
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.productName'),
    field: 'stream_basename',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.closingAmbient'),
    field: 'close_amb_tot',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 100,
    cellEditor: 'NumericEditor',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.closingMass'),
    field: 'close_mass_tot',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.litres'),
    field: 'adj_amb_tot',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 100,
    cellEditor: 'NumericEditor',
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.kg'),
    field: 'adj_mass_tot',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.adjustmentReason'),
    field: 'adj_description',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 300,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.gainLossExplanation'),
    field: 'description',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 250,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.mtrQtyType'),
    field: 'bam_qty_type_str',
    sortable: true,
    resizable: true,
    width: 80,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.lastModifiedBy'),
    field: 'user_code',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.lastModified'),
    field: 'last_chg_time',
    sortable: true,
    resizable: true,
    width: 190,
    cellRenderer: 'DateRenderer',
    suppressSizeToFit: true,
  },
];

export default columns;
