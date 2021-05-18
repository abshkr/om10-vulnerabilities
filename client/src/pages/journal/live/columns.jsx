const columns = (t) => [
  {
    headerName: t('fields.dateTime'),
    field: 'gen_date',
    sortable: true,
    resizable: true,
    cellRenderer: 'DateRenderer',
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.category'),
    field: 'msg_class',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.event'),
    field: 'msg_event',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.details'),
    field: 'message',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
  },
];

export default columns;
