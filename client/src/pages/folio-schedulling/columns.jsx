const columns = t => [
  {
    headerName: t('fields.window'),
    field: 'window_name',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    // minWidth: 90,
    maxWidth: 200,
    valueGetter: function(params) {
      if (params.data.window_name === "DATE_YEAR_WINDOW") {
        return t("descriptions.dateOfYear");
      } else if (params.data.window_name === "MONTH_WINDOW") {
        return t("descriptions.dateOfMonth");
      } else if (params.data.window_name === "WEEK_WINDOW") {
        return t("descriptions.dayOfWeek");
      } else if (params.data.window_name === "YEAR_WINDOW") {
        return t("descriptions.dayOfYear");
      } else if (params.data.window_name === "ONCE_WINDOW") {
        return t("descriptions.onceOffDate");
      } 
    }
  },
  {
    headerName: t('fields.exception'),
    field: 'repeat_interval',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    valueGetter: function(params) {
      if (params.data.window_name === "WEEK_WINDOW") {
        return t("generic.every") + params.data.repeat_interval;
      } else if (params.data.window_name === "MONTH_WINDOW") {
        return t("generic.every") + params.data.repeat_interval + t("generic.everyMonth");
      } else if (params.data.window_name === "DATE_YEAR_WINDOW") {
        let data = params.data.repeat_interval.split("_");
        return t("generic.every") + data[0] + " of " + ["January","February","March","April","May","June","July",
          "August","September","October","November","December"][data[1] - 1];
      } else if (params.data.window_name === "YEAR_WINDOW") {
        let data = params.data.repeat_interval.split("_");
        return t("generic.every") + 
          ["First","Second","Third","Fourth","Fifth"][data[0]] + " " +
          data[1] + " of " + 
          ["January","February","March","April","May","June","July",
          "August","September","October","November","December"][data[2] - 1];
      } else if (params.data.window_name === "ONCE_WINDOW") {
        let data = params.data.repeat_interval.split("_");
        return data[2] + " " + 
          ["January","February","March","April","May","June","July",
          "August","September","October","November","December"][data[1] - 1] + 
          " " + data[0]
      }
      return params.data.repeat_interval;
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
  {
    headerName: t('fields.status'),
    field: 'status',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    maxWidth: 100,
  },
  {
    headerName: t('fields.description'),
    field: 'description',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
  },
];

export default columns;
