const columns = t => [
  {
    headerName: t('fields.columnNo'),
    field: 'expiry_date_no',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 120,
  },
  {
    headerName: t('fields.expiryDate'),
    field: 'expiry_date_desc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.title'),
    field: 'expiry_date_titl',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 240,
  },
  {
    headerName: t('fields.rejectAuthorization'),
    field: 'expiry_date_reja',
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  },
];

export default columns;
