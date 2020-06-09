const columns = (t) => [
  {
    headerName: t('fields.bay'),
    field: 'stream_baycode',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.arm'),
    field: 'stream_armcode',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
];

export default columns;
