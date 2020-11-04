const columns = (t, form, units, access) => [
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
    editable: access.extra,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'ScheduleEditor',
    cellEditorParams: {
      form: form,
      min: 0,
      max: 99999999,
    },
  },

  {
    headerName: t('fields.unit'),
    field: 'unit_name',
    resizable: true,
    width: 250,
    suppressSizeToFit: true,
    cellEditor: 'UnitEditor',
    editable: true,
    editable: access.extra,
    cellClass: 'editable-ag-grid-cell',
    cellEditorParams: {
      values: units?.records || [],
      form: form,
    },
  },
];

export default columns;
