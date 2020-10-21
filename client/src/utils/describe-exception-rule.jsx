const describeExceptionRule = (t, window_name, repeat_interval) => {
  const weekdays = {
    "Monday" : t('fields.folioPlannerWeekMon'),
    "Tuesday" : t('fields.folioPlannerWeekTue'),
    "Wednesday" : t('fields.folioPlannerWeekWed'),
    "Thursday" : t('fields.folioPlannerWeekThu'),
    "Friday" : t('fields.folioPlannerWeekFri'),
    "Saturday" : t('fields.folioPlannerWeekSat'),
    "Sunday" : t('fields.folioPlannerWeekSun'),
  };
  const months = [
    t('fields.folioPlannerMonthJan'),
    t('fields.folioPlannerMonthFeb'),
    t('fields.folioPlannerMonthMar'),
    t('fields.folioPlannerMonthApr'),
    t('fields.folioPlannerMonthMay'),
    t('fields.folioPlannerMonthJun'),
    t('fields.folioPlannerMonthJul'),
    t('fields.folioPlannerMonthAug'),
    t('fields.folioPlannerMonthSep'),
    t('fields.folioPlannerMonthOct'),
    t('fields.folioPlannerMonthNov'),
    t('fields.folioPlannerMonthDec'),
  ];
  const numths = [
    t('fields.folioPlannerNumth1st'),
    t('fields.folioPlannerNumth2nd'),
    t('fields.folioPlannerNumth3rd'),
    t('fields.folioPlannerNumth4th'),
    t('fields.folioPlannerNumth5th'),
  ];

  if (window_name === "WEEK_WINDOW") {
    // "patternWeekWindow": "每个[[WEEK_DAY]]",
    let txt = t('descriptions.patternWeekWindow');
    // txt = t("generic.every") + weekdays[repeat_interval];
    txt = txt.replace('[[WEEK_DAY]]', weekdays[repeat_interval]);
    return txt;
  } else if (window_name === "MONTH_WINDOW") {
    // "patternMonthWindow": "每个月的[[MONTH_DAY]]号",
    let txt = t('descriptions.patternMonthWindow')
    // txt = t("generic.every") + repeat_interval + t("generic.everyMonth");
    txt = txt.replace('[[MONTH_DAY]]', repeat_interval);
    return txt;
  } else if (window_name === "DATE_YEAR_WINDOW") {
    // "patternDateYearWindow": "每个[[MONTH]][[MONTH_DAY]]号",
    let txt = t('descriptions.patternDateYearWindow')
    let data = repeat_interval.split("_");
    // txt = t("generic.every") + data[0] + t('descriptions.of') + months[data[1] - 1];
    txt = txt.replace('[[MONTH_DAY]]', data[0]);
    txt = txt.replace('[[MONTH]]', months[data[1] - 1]);
    return txt;
  } else if (window_name === "YEAR_WINDOW") {
    // "patternYearWindow": "每个[[MONTH]]的[[SEQ_DAY]][[WEEK_DAY]]",
    let txt = t('descriptions.patternYearWindow')
    let data = repeat_interval.split("_");
    // txt = t("generic.every") + numths[data[0]] + " " + weekdays[data[1]] + t('descriptions.of') + months[data[2] - 1];
    txt = txt.replace('[[SEQ_DAY]]', numths[data[0]]);
    txt = txt.replace('[[WEEK_DAY]]', weekdays[data[1]]);
    txt = txt.replace('[[MONTH]]', months[data[2] - 1]);
    return txt;
  } else if (window_name === "ONCE_WINDOW") {
    // "patternOnceWindow": "[[YEAR]]年[[MONTH]][[MONTH_DAY]]号",
    let txt = t('descriptions.patternOnceWindow')
    let data = repeat_interval.split("_");
    // txt = data[2] + " " + months[data[1] - 1] + " " + data[0];
    txt = txt.replace('[[YEAR]]', data[2]);
    txt = txt.replace('[[MONTH]]', months[data[1] - 1]);
    txt = txt.replace('[[MONTH_DAY]]', data[0]);
    return txt;
  } else if (window_name === "OVERRIDE") {
    // "patternOverride": "盘点将于[[YEAR]]年[[MONTH]][[MONTH_DAY]]号当日进行",
    let txt = t('descriptions.patternOverride')
    let data = repeat_interval.split("_");
    // txt = t("generic.overriderun") + " " + data[2] + " " + months[data[1] - 1] + " " + data[0];
    txt = txt.replace('[[YEAR]]', data[2]);
    txt = txt.replace('[[MONTH]]', months[data[1] - 1]);
    txt = txt.replace('[[MONTH_DAY]]', data[0]);
    return txt;
  }
  return repeat_interval;
};

export default describeExceptionRule;
  