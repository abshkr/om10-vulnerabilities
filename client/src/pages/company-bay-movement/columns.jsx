const columns = (t) => [
  {
    headerName: t('fields.bayCode'),
    field: 'bacl_bay_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.companyCode'),
    field: 'bacl_cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.companyName'),
    field: 'cmpy_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.bayType'),
    field: 'bacl_bay_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
