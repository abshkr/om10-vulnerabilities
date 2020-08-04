const overrideCols = t => [
  {
    headerName: t('fields.override'),
    field: 'repeat_interval',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    valueGetter: function(params) {
      let data = params.data.repeat_interval.split("_");
      return t("generic.overriderun") + " " + data[2] + " " + 
        ["January","February","March","April","May","June","July",
        "August","September","October","November","December"][data[1] - 1] + 
        " " + data[0];
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
