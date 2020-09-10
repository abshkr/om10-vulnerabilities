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

const momentLocales = {en: enLocale, cn: zhLocale};

const { RangePicker } = DatePicker;

const Calendar = ({ handleChange, handleClear, start, end, disabled, enableClear, max, format }) => {
  const { dateTimeFormat } = useContext(ConfigStore);

  const { t, i18n } = useTranslation();

  const locale = momentLocales[i18n.language||'en'];

  const formatted = format || dateTimeFormat;

  const limit = max || 365;

  const ranges = {
    [t('fields.today')]: [moment().startOf('day'), moment().endOf('day'), 'range'],
    [t('fields.thisWeek')]: [moment().startOf('week'), moment().endOf('week'), 'range'],
  };

  const onChange = (dates) => {
    const difference = dates[1]?.diff(dates[0], 'days');

    if (difference <= limit) {
      handleChange(dates[0].format(DATE_TIME_FORMAT), dates[1].format(DATE_TIME_FORMAT));
    } else {
      notification.warning({
        key: 'date-range-warning',
        message: t('messages.maxDateRange'),
        description: `${t('descriptions.maxDateRange')} ${limit}`,
      });
    }
  };

  const onRangeSelect = (dates) => {
    if (dates) {
      if (dates[2] === 'range') {
        handleChange(dates[0].format(DATE_TIME_FORMAT), dates[1].format(DATE_TIME_FORMAT));
      }
    } else {
      handleClear();
    }
  };

  return (
    <RangePicker
      allowClear={enableClear}
      format={formatted}
      disabled={disabled || (!start && !end)}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      defaultValue={[moment(start, DATE_TIME_FORMAT), moment(end, DATE_TIME_FORMAT)]}
      value={[moment(start, DATE_TIME_FORMAT), moment(end, DATE_TIME_FORMAT)]}
      onOk={(dates) => onChange(dates)}
      onChange={(dates) => onRangeSelect(dates)}
      ranges={ranges}
      style={{ width: '360px' }}
      locale={locale}
    />
  );
};

export default Calendar;
