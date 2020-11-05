import React, { useContext } from 'react';
import { DatePicker, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import ConfigStore from 'stores/config-store';
import { DATE_TIME_FORMAT } from 'constants/settings';

import 'moment/locale/en-gb';
import 'moment/locale/zh-cn';
import enLocale from 'antd/es/date-picker/locale/en_GB';
import zhLocale from 'antd/es/date-picker/locale/zh_CN';

const momentLocales = { en: enLocale, cn: zhLocale };

const { RangePicker } = DatePicker;

const RangeCalendar = ({ handleChange, handleClear, start, end, disabled, enableClear, max, format }) => {
  const { dateTimeFormat } = useContext(ConfigStore);

  const { t, i18n } = useTranslation();

  const locale = momentLocales[i18n.language || 'en'];

  const formatted = format || dateTimeFormat;

  const limit = max || 365;

  const ranges = {
    [t('fields.today')]: [moment().startOf('day'), moment().endOf('day'), 'range'],
    [t('fields.thisWeek')]: [moment().startOf('week'), moment().endOf('week'), 'range'],
  };

  const getRangeValue = (dt) => {
    console.log('..........getRangeValue', dt);
    if (dt === '-1' || !dt) {
      return null;
    } else {
      return moment(dt, DATE_TIME_FORMAT);
    }
  };

  const setRangeValue = (dates) => {
    let d0 = null;
    let d1 = null;
    if (!dates) {
      d0 = '-1';
      d1 = '-1';
    } else {
      if (!dates[0]) {
        d0 = '-1';
      } else {
        d0 = dates[0].format(DATE_TIME_FORMAT);
      }
      if (!dates[1]) {
        d1 = '-1';
      } else {
        d1 = dates[1].format(DATE_TIME_FORMAT);
      }
    }
    handleChange(d0, d1);
    console.log('..........setRangeValue', d0, d1);
  };

  const onChange = (dates) => {
    console.log('.............onChange', dates);
    if (dates && dates[0] && dates[1]) {
      const difference = dates[1]?.diff(dates[0], 'days');

      if (difference <= limit) {
        setRangeValue(dates);
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
      handleClear('-1', '-1');
    }
  };

  return (
    <RangePicker
      allowEmpty={[true, true]}
      allowClear={enableClear}
      format={formatted}
      // disabled={disabled || (!start && !end) || (start==='-1' && end==='-1')}
      disabled={disabled}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      defaultValue={[getRangeValue(start), getRangeValue(end)]}
      value={[getRangeValue(start), getRangeValue(end)]}
      onOk={(dates) => onChange(dates)}
      onChange={(dates) => onRangeSelect(dates)}
      ranges={ranges}
      style={{ width: '360px' }}
      locale={locale}
    />
  );
};

export default RangeCalendar;
