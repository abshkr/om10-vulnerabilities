const columns = t => [
  {
    headerName: t('fields.time'),
    field: 'gen_date',
    sortable: true,
    resizable: true,
    cellRenderer: 'DateRenderer'
  },
  {
    headerName: t('fields.event'),
    field: 'msg_event',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true
  },
  {
    headerName: t('fields.details'),
    field: 'message',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  }
];

export default columns;
