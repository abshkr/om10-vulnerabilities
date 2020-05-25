const overrideCols = t => [
  {
    headerName: t('fields.override'),
    field: 'repeat_interval',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    valueGetter: function(params) {
      return t("generic.overriderun") + params.data.repeat_interval;
    }
  },
  {
    headerName: t('fields.user'),
    field: 'user_code',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
  },
  {
    headerName: t('fields.modifiedDate'),
    field: 'last_chg_time',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    cellRenderer: 'DateRenderer',
  },
];

export default overrideCols;
