const columns = (t, values, form) => [
  // {
  //   headerName: t('fields.parentCmpyCode'),
  //   field: 'parent_cmpy_code',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true,
  // },
  // {
  //   headerName: t('fields.parentCmpyName'),
  //   field: 'parent_cmpy_name',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true,
  // },
  // {
  //   headerName: t('fields.parentCmpyType'),
  //   field: 'parent_cmpy_role_name',
  //   filter: 'FuzzyFilter',
  //   sortable: true,
  //   resizable: true,
  // },
  {
    headerName: t('fields.childCmpyCode'),
    field: 'child_cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.childCmpyName'),
    field: 'child_cmpy_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.childCmpyType'),
    field: 'child_cmpy_role_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.status'),
    field: 'status',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    width: 90,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.createdAt'),
    field: 'create_date',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.comments'),
    field: 'comments',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
