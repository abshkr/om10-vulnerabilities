const columns = t => [
  {
    headerName: t('fields.id'),
    field: 'closeout_nr',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
  },
  {
    headerName: t('fields.folioName'),
    field: 'closeout_name',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
  },
  {
    headerName: t('fields.openingDate'),
    field: 'prev_closeout_date',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.freezeDate'),
    field: 'closeout_date',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.status'),
    field: 'status_str',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
  },
  {
    headerName: t('fields.user'),
    field: 'user_code',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
  },

  {
    headerName: t('fields.dateChanged'),
    field: 'last_chg_time',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
];

export default columns;
