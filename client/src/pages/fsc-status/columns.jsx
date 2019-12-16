const columns = t => [
  {
    headerName: t('fields.node'),
    field: 'id',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
  },
  {
    headerName: t('fields.heartBeat'),
    field: 'heartBeat',
    sortable: true,
    cellRenderer: 'DateRenderer',
    resizable: true,
  },
  {
    headerName: t('fields.errorCount'),
    field: 'errorCount',
    cellRenderer: 'StatusRenderer',
    sortable: true,
    resizable: true,
    predicate: ['0', 'success', 'error'],
  },
  {
    headerName: t('fields.sendCount'),
    field: 'sendCount',
    cellRenderer: 'StatusRenderer',
    sortable: true,
    resizable: true,
    predicate: ['0', 'success', 'processing'],
  },
];

export default columns;
