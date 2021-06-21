const columns = (t, enabled) => [
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
    headerName: t('fields.productCode'),
    field: 'curr_basecode',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.productName'),
    field: 'curr_basename',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.closingAmbient'),
    field: 'close_amb_tot',
    sortable: true,
    resizable: true,
    editable: function (params) {
      return enabled && params.node.data.bam_qty_type === '0';
    },
    cellClass: function (params) {
      if (enabled && params.node.data.bam_qty_type === '0') {
        return 'editable-ag-grid-cell';
      }

      return '';
    },
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.closingMass'),
    field: 'close_mass_tot',
    sortable: true,
    resizable: true,
    editable: function (params) {
      return enabled && params.node.data.bam_qty_type === '1';
    },
    cellClass: function (params) {
      if (enabled && params.node.data.bam_qty_type === '1') {
        return 'editable-ag-grid-cell';
      }

      return '';
    },
    width: 100,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.adjustmentLiter'),
    field: 'adj_amb_tot',
    sortable: true,
    resizable: true,
    editable: function (params) {
      return enabled && params.node.data.bam_qty_type === '0';
    },
    cellClass: function (params) {
      if (enabled && params.node.data.bam_qty_type === '0') {
        return 'editable-ag-grid-cell';
      }

      return '';
    },
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.adjustmentKG'),
    field: 'adj_mass_tot',
    sortable: true,
    resizable: true,
    editable: function (params) {
      return enabled && params.node.data.bam_qty_type === '1';
    },
    cellClass: function (params) {
      if (enabled && params.node.data.bam_qty_type === '1') {
        return 'editable-ag-grid-cell';
      }

      return '';
    },
    width: 100,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.adjustmentReason'),
    field: 'adj_description',
    sortable: true,
    resizable: true,
    editable: enabled,
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
    width: 300,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.gainLossExplanation'),
    field: 'description',
    sortable: true,
    resizable: true,
    editable: enabled,
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
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
