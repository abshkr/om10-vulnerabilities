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
  },

  {
    headerName: t('fields.schedule'),
    field: 'qty_scheduled',
    resizable: true,
    width: 400,
    // suppressSizeToFit: true,
    editable: access.extra,
    cellEditor: 'ScheduleEditor',
    cellEditorParams: {
      form: form,
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
    cellEditorParams: {
      values: units?.records || [],
      form: form,
    },
  },
];

export default columns;
