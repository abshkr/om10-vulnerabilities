const columns = (t) => [
  {
    headerName: t('fields.code'),
    field: 'term_code',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.name'),
    field: 'term_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.contact'),
    field: 'term_contact',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.address'),
    field: 'address_text',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
];

export default columns;
