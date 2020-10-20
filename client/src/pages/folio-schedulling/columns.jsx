import _ from 'lodash';

const columns = (t, windows, weekdays, months, numths) => [
  {
    headerName: t('fields.window'),
    field: 'window_name',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    // minWidth: 90,
    maxWidth: 200,
    valueGetter: function(params) {
      return windows[params.data.window_name];
      /* if (params.data.window_name === "DATE_YEAR_WINDOW") {
        return t("descriptions.dateOfYear");
      } else if (params.data.window_name === "MONTH_WINDOW") {
        return t("descriptions.dateOfMonth");
      } else if (params.data.window_name === "WEEK_WINDOW") {
        return t("descriptions.dayOfWeek");
      } else if (params.data.window_name === "YEAR_WINDOW") {
        return t("descriptions.dayOfYear");
      } else if (params.data.window_name === "ONCE_WINDOW") {
        return t("descriptions.onceOffDate");
      } */
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
        // "patternWeekWindow": "每个[[WEEK_DAY]]",
        let txt = t('descriptions.patternWeekWindow');
        // txt = t("generic.every") + weekdays[params.data.repeat_interval];
        txt = _.replace(txt, '[[WEEK_DAY]]', weekdays[params.data.repeat_interval]);
        return txt;
      } else if (params.data.window_name === "MONTH_WINDOW") {
        // "patternMonthWindow": "每个月的[[MONTH_DAY]]号",
        let txt = t('descriptions.patternMonthWindow')
        // txt = t("generic.every") + params.data.repeat_interval + t("generic.everyMonth");
        txt = txt.replace('[[MONTH_DAY]]', params.data.repeat_interval);
        return txt;
      } else if (params.data.window_name === "DATE_YEAR_WINDOW") {
        // "patternDateYearWindow": "每个[[MONTH]][[MONTH_DAY]]号",
        let txt = t('descriptions.patternDateYearWindow')
        let data = params.data.repeat_interval.split("_");
        // txt = t("generic.every") + data[0] + t('descriptions.of') + months[data[1] - 1];
        txt = txt.replace('[[MONTH_DAY]]', data[0]);
        txt = txt.replace('[[MONTH]]', months[data[1] - 1]);
        return txt;
      } else if (params.data.window_name === "YEAR_WINDOW") {
        // "patternYearWindow": "每个[[MONTH]]的[[SEQ_DAY]][[WEEK_DAY]]",
        let txt = t('descriptions.patternYearWindow')
        let data = params.data.repeat_interval.split("_");
        // txt = t("generic.every") + numths[data[0]] + " " + weekdays[data[1]] + t('descriptions.of') + months[data[2] - 1];
        txt = txt.replace('[[SEQ_DAY]]', numths[data[0]]);
        txt = txt.replace('[[WEEK_DAY]]', weekdays[data[1]]);
        txt = txt.replace('[[MONTH]]', months[data[2] - 1]);
        return txt;
      } else if (params.data.window_name === "ONCE_WINDOW") {
        // "patternOnceWindow": "[[YEAR]]年[[MONTH]][[MONTH_DAY]]号",
        let txt = t('descriptions.patternOnceWindow')
        let data = params.data.repeat_interval.split("_");
        // txt = data[2] + " " + months[data[1] - 1] + " " + data[0];
        txt = txt.replace('[[YEAR]]', data[2]);
        txt = txt.replace('[[MONTH]]', months[data[1] - 1]);
        txt = txt.replace('[[MONTH_DAY]]', data[0]);
        return txt;
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
