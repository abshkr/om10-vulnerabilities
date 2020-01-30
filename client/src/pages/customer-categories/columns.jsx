const columns = t => [
  {
    headerName: t('fields.code'),
    field: 'category_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.name'),
    field: 'category_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.totalCustomerCategories'),
    field: 'category_count',
    filterable: true,
    sortable: true,
    resizable: true
  }
];

export default columns;
