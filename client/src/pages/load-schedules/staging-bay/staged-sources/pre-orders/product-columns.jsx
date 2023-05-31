const columns = (t, config) => [
  {
    headerName: t('fields.code'),
    field: 'prod_code',
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    pinned: 'left',
    dndSource: true,
  },

  {
    headerName: t('fields.product'),
    field: 'prod_name',
    resizable: true,
  },

  {
    headerName: t('fields.schedule'),
    field: 'qty_scheduled',
    resizable: true,
    width: 200,
    cellRenderer: 'SeperatorRenderer',
    cellRendererParams: {
      type: String(config?.decimal_thousand_separator),
    },
  },

  {
    headerName: t('fields.loaded'),
    field: 'qty_loaded',
    resizable: true,
    width: 200,
    cellRenderer: 'QuantitySeperatorRenderer',
    cellRendererParams: {
      type: String(config?.decimal_thousand_separator),
      digits: '0',
      min: '1',
    },
  },

  {
    headerName: t('fields.preloaded'),
    field: 'qty_preloaded',
    resizable: true,
    width: 200,
    cellRenderer: 'SeperatorRenderer',
    cellRendererParams: {
      type: String(config?.decimal_thousand_separator),
    },
  },

  {
    headerName: t('fields.unit'),
    field: 'unit_name',
    resizable: true,
    width: 150,
  },
];

export default columns;
