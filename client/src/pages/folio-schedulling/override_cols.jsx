const overrideCols = (t, months) => [
  {
    headerName: t('fields.override'),
    field: 'repeat_interval',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    valueGetter: function(params) {
      // "patternOverride": "盘点将于[[YEAR]]年[[MONTH]][[MONTH_DAY]]号当日进行",
      let txt = t('descriptions.patternOverride')
      let data = params.data.repeat_interval.split("_");
      // txt = t("generic.overriderun") + " " + data[2] + " " + months[data[1] - 1] + " " + data[0];
      txt = txt.replace('[[YEAR]]', data[2]);
      txt = txt.replace('[[MONTH]]', months[data[1] - 1]);
      txt = txt.replace('[[MONTH_DAY]]', data[0]);
      return txt;
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
