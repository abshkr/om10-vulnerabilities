const columns = (t, form, units) => [
  {
    headerName: t('fields.code'),
    field: 'prod_code',
    resizable: true,
    width: 220,
    suppressSizeToFit: true,
    // pinned: 'left',
  },
  {
    headerName: t('fields.product'),
    field: 'prod_name',
    resizable: true,
    width: 400,
    cellRenderer: 'ProductRender',
  },
  {
    headerName: t('fields.schedule'),
    field: 'qty_scheduled',
    resizable: true,
    width: 400,
    // suppressSizeToFit: true,
    editable: false,
  },

  {
    headerName: t('fields.unit'),
    field: 'unit_name',
    resizable: true,
    width: 250,
    suppressSizeToFit: true,
    editable: false,
  },
];

export default columns;
