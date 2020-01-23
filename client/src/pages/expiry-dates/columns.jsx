const columns = t => [
  {
    headerName: t('fields.type'),
    field: 'edt_target_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.typeCode'),
    field: 'edt_type_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.typeDescription'),
    field: 'edt_type_desc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.enabled'),
    field: 'edt_status',
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.rejectAuthorization'),
    field: 'edt_reject',
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.default'),
    field: 'edt_default',
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.defaultValue'),
    field: 'edt_def_exp_date',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.dateTimeFormat'),
    field: 'edt_date_fmt',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.timeEnabled'),
    field: 'edt_time_enabled',
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.totalChildRecords'),
    field: 'child_count',
    sortable: true,
    resizable: true
  }
];

export default columns;
