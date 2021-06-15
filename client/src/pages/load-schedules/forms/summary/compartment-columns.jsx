const columns = (t, form, products, soldTo, shipTo, units) => [
  {
    headerName: t('fields.equipment'),
    field: 'eqpt_code',
    resizable: true,
    width: 130,
    suppressSizeToFit: true,
    pinned: 'left',
  },

  {
    headerName: t('fields.compartment'),
    field: 'compartment',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
    pinned: 'left',
  },

  {
    headerName: t('fields.code'),
    field: 'prod_code',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.product'),
    field: 'prod_name',
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.schedule'),
    field: 'qty_scheduled',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.loaded'),
    field: 'qty_loaded',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '1',
    },
  },

  {
    headerName: t('fields.preloaded'),
    field: 'qty_preload',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'PreloadEditor',
    cellEditorParams: {
      min: 0,
      max: 999999,
      form: form,
    },
    /* cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 999999999,
        min: 0,
      },
      t,
    },*/
  },

  {
    headerName: t('fields.unit'),
    field: 'unit_name',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.orderNumber'),
    field: 'order_cust_ordno',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.safeFill'),
    field: 'safefill',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },

  // {
  //   headerName: t('fields.prevProduct'),
  //   field: 'shls_srctype',
  //   resizable: true,
  //   width: 90,
  //   suppressSizeToFit: true,
  // },

  {
    headerName: t('fields.soldTo'),
    field: 'schd_sold_to_num',
    resizable: true,
    width: 90,
  },

  {
    headerName: t('fields.delvNo'),
    field: 'schd_deliv_num',
    resizable: true,
    width: 90,
  },

  {
    headerName: t('fields.shipTo'),
    field: 'schd_ship_to_num',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },
];

export default columns;
