const columns = (t, form, products, soldTo, shipTo, units) => [
  {
    headerName: t('fields.compartment'),
    field: 'compartment',
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
    pinned: 'left',
  },

  {
    headerName: t('fields.code'),
    field: 'prod_code',
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.product'),
    field: 'prod_name',
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
    editable: true,
    cellEditor: 'ProductEditor',
    cellEditorParams: {
      values: products,
      form: form,
    },
  },

  {
    headerName: t('fields.schedule'),
    field: 'qty_scheduled',
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    editable: true,
    cellEditor: 'ScheduleEditor',
    cellEditorParams: {
      min: 0,
      max: 15000,
      form: form,
    },
  },

  {
    headerName: t('fields.unit'),
    field: 'unit_name',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
    editable: true,
    cellEditor: 'UnitEditor',
    cellEditorParams: {
      values: units?.records || [],
      form: form,
    },
  },

  {
    headerName: t('fields.orderNumber'),
    field: 'shls_srctype',
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.safeFill'),
    field: 'safefill',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.prevProduct'),
    field: 'shls_srctype',
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.soldTo'),
    field: 'schd_sold_to_num',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
    editable: true,
    cellEditor: 'SoldToEditor',
    cellEditorParams: {
      values: soldTo?.records || [],
      form: form,
    },
  },

  {
    headerName: t('fields.delvNo'),
    field: 'schd_deliv_num',
    resizable: true,
    width: 90,
    editable: true,
    suppressSizeToFit: true,
    cellEditor: 'DelvNoEditor',
    cellEditorParams: {
      form: form,
    },
  },

  {
    headerName: t('fields.shipTo'),
    field: 'schd_ship_to_num',
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
    editable: true,
    cellEditor: 'ShipToEditor',
    cellEditorParams: {
      values: shipTo?.records || [],
      form: form,
    },
  },
];

export default columns;
