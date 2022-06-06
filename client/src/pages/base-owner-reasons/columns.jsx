const columns = (t) => [
  {
    headerName: t('fields.otrId'),
    field: 'otr_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 60,
  },
  {
    headerName: t('fields.otrCode'),
    field: 'otr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
  },
  {
    headerName: t('fields.otrText'),
    field: 'otr_text',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 240,
  },
  {
    headerName: t('fields.otrType'),
    field: 'otr_type_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 100,
  },
  {
    headerName: t('fields.otrFlag'),
    field: 'otr_flag',
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true,
    width: 80,
  },
  {
    headerName: t('fields.otrCount'),
    field: 'otrsa_count',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 140,
    // hide: true,
  },
];

export default columns;
