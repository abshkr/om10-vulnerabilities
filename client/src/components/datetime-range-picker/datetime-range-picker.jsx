import React, { useContext, useEffect, useState } from 'react';
import { DatePicker, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'dayjs';

import ConfigStore from 'stores/config-store';
import { DATE_TIME_FORMAT } from 'constants/settings';
import { getRangeDays } from 'utils';

import 'moment/locale/en-gb';
import 'moment/locale/zh-cn';
import enLocale from 'antd/es/date-picker/locale/en_GB';
import zhLocale from 'antd/es/date-picker/locale/zh_CN';

const momentLocales = { en: enLocale, cn: zhLocale };

const { RangePicker } = DatePicker;

/*
  handleChange: The function which sets "start" and "end" for SQL conditions. 
    Normally it is defined as "setRange" in parent screen. This is the only place to change the date range to get records.
  rangeSetting: The setting from SITE_CONFIG with the pattern 'x~~y' where x and y must be either positive integer or -1.
    This setting is used to initialize or reset the date range.
  refreshed: The flag is set as true when button "Refresh" is clicked in parent screen, 
    and set back to false by DateTimeRangePicker after date range is reset to the value in "rangeSetting".
  setRefreshed: A useState function to set "refreshed" back to false inside DateTimeRangePicker.
  disabled: The flag to enable or disble the component.
  enableClear: The flag to control whether the start and end date can be blank.
  max: The maximum days allowed for a range.
  format: The format of date time, and the one from SITE_CONFIG will be used if this parameter is not defined.
  localBased: The flag to control whether to use the server-based time or local-based time. 
    Server time will be used if this parameter is not defined.
*/
const DateTimeRangePicker = ({
  handleChange,
  rangeSetting,
  refreshed,
  setRefreshed,
  disabled,
  enableClear,
  max,
  format,
  localBased,
}) => {
  const { dateTimeFormat, serverTime } = useContext(ConfigStore);
  const [start, setStart] = useState(moment().subtract(7, 'days').format(DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(DATE_TIME_FORMAT));
  const dtDefault = '-1'; // either '-1' or null

  const { t, i18n } = useTranslation();

  const locale = momentLocales[i18n.language || 'en'];

  const formatted = format || dateTimeFormat;

  const limit = max || 365;

  const ranges = {
    [t('fields.today')]: [moment().startOf('day'), moment().endOf('day'), 'range'],
    [t('fields.thisWeek')]: [moment().startOf('week'), moment().endOf('week'), 'range'],
  };

  const rangePresets = [
    {
      label: t('fields.today'),
      value: [moment().startOf('day'), moment().endOf('day'), 'range'],
    },
    {
      label: t('fields.thisWeek'),
      value: [moment().startOf('week'), moment().endOf('week'), 'range'],
    },
    {
      label: t('fields.thisMonth'),
      value: [moment().startOf('month'), moment().endOf('month'), 'range'],
    },
    {
      label: t('fields.thisYear'),
      value: [moment().startOf('year'), moment().endOf('year'), 'range'],
    },
  ];

  const getRangeValue = (dt) => {
    // console.log('..........getRangeValue', dt);
    if (dt === '-1' || !dt) {
      return null;
    } else {
      return moment(dt, DATE_TIME_FORMAT);
    }
  };

  const setRangeValue = (dates) => {
    let st = dtDefault;
    let et = dtDefault;
    if (dates) {
      if (!dates[0]) {
        st = dtDefault;
      } else {
        st = dates[0].format(DATE_TIME_FORMAT);
      }
      if (!dates[1]) {
        et = dtDefault;
      } else {
        et = dates[1].format(DATE_TIME_FORMAT);
      }
    }
    setStart(st);
    setEnd(et);
    handleChange(st, et);
    console.log('..........setRangeValue', st, et);
  };

  const onChange = (dates) => {
    console.log('.............onChange', dates);
    if (dates && dates[0] && dates[1]) {
      const difference = dates[1]?.diff(dates[0], 'days');

      if (difference <= limit) {
        const diffSeconds = dates[1]?.diff(dates[0], 'seconds');
        if (diffSeconds >= 0) {
          setRangeValue(dates);
        } else {
          notification.warning({
            key: 'date-range-warning',
            message: t('messages.seqDateRange'),
            description: `${t('descriptions.seqDateRange')}`,
          });
        }
      } else {
        notification.warning({
          key: 'date-range-warning',
          message: t('messages.maxDateRange'),
          description: `${t('descriptions.maxDateRange')} ${limit}`,
        });
      }
    } else {
      setRangeValue(dates);
    }
  };

  const onRangeSelect = (dates) => {
    console.log('.............onRangeSelect', dates);
    if (dates) {
      if (dates[2] === 'range') {
        setRangeValue(dates);
      }
    } else {
      setStart(dtDefault);
      setEnd(dtDefault);
      handleChange(dtDefault, dtDefault);
    }
  };

  const resetRangeValue = (rangeSetting, localBased) => {
    let serverDateTime = undefined;
    const sessTime = sessionStorage.getItem('serverDateTime');
    if (sessTime) {
      serverDateTime = sessTime;
    } else {
      serverDateTime = serverTime;
    }

    if (localBased === true || (!localBased && serverDateTime)) {
      const ranges = getRangeDays(String(rangeSetting), max);
      let st = dtDefault;
      let et = dtDefault;

      if (ranges.beforeToday !== -1) {
        if (!localBased) {
          st = moment(serverDateTime, DATE_TIME_FORMAT)
            .subtract(ranges.beforeToday, 'days')
            .format(DATE_TIME_FORMAT);
        } else {
          st = moment().subtract(ranges.beforeToday, 'days').format(DATE_TIME_FORMAT);
        }
      }

      if (ranges.afterToday !== -1) {
        if (!localBased) {
          et = moment(serverDateTime, DATE_TIME_FORMAT)
            .add(ranges.afterToday, 'days')
            .format(DATE_TIME_FORMAT);
        } else {
          et = moment().add(ranges.afterToday, 'days').format(DATE_TIME_FORMAT);
        }
      }

      setStart(st);
      setEnd(et);
      handleChange(st, et);
    }
  };

  useEffect(() => {
    console.log('...................useEffect...rangeSetting, localBased', rangeSetting, localBased);
    resetRangeValue(rangeSetting, localBased);
  }, [rangeSetting, localBased]);

  useEffect(() => {
    console.log(
      '...................useEffect...refreshed, rangeSetting, localBased',
      refreshed,
      rangeSetting,
      localBased
    );
    if (refreshed) {
      resetRangeValue(rangeSetting, localBased);
      setRefreshed(false);
    }
  }, [refreshed]);

  return (
    <RangePicker
      allowEmpty={[true, true]}
      allowClear={enableClear}
      format={formatted}
      // disabled={disabled || (!start && !end) || (start===dtDefault && end===dtDefault)}
      disabled={disabled}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      defaultValue={[getRangeValue(start), getRangeValue(end)]}
      value={[getRangeValue(start), getRangeValue(end)]}
      onOk={(dates) => onChange(dates)}
      onChange={(dates) => onRangeSelect(dates)}
      // ranges={ranges}
      presets={rangePresets}
      style={{ width: '360px' }}
      locale={locale}
    />
  );
};

export default DateTimeRangePicker;
