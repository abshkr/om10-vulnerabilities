const columns = (t) => [
  {
    headerName: t('fields.addressCode'),
    field: 'db_address_key',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 250,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.addressDetails'),
    field: 'address_text',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
