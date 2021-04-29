const columns = (t) => [
  {
    headerName: t('fields.code'),
    field: 'prod_code',
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    pinned: 'left',
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
  },

  {
    headerName: t('fields.loaded'),
    field: 'qty_loaded',
    resizable: true,
    width: 200,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '1',
    },
  },

  {
    headerName: t('fields.preloaded'),
    field: 'qty_preloaded',
    resizable: true,
    width: 200,
  },

  {
    headerName: t('fields.unit'),
    field: 'unit_name',
    resizable: true,
    width: 150,
  },
];

export default columns;
