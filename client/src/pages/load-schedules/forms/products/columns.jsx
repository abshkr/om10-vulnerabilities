const columns = (t, form, units) => [
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
    suppressSizeToFit: true,
    editable: true,
    cellEditor: 'ScheduleEditor',
    cellEditorParams: {
      form: form,
    },
  },

  {
    headerName: t('fields.unit'),
    field: 'unit_name',
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    cellEditor: 'UnitEditor',
    editable: true,
    cellEditorParams: {
      values: units?.records || [],
      form: form,
    },
  },
];

export default columns;