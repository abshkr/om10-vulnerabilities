const columns = (t) => [
  {
    headerName: t('fields.addressCode'),
    field: 'addr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.addressDetails'),
    field: 'db_addr_line',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
