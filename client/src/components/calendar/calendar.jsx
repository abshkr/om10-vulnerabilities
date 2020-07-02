import React from 'react';
import { DatePicker, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import getDateTimeFormat from 'utils/get-date-time-format';
import { DATE_TIME_FORMAT } from 'constants/settings';

const { RangePicker } = DatePicker;

const Calendar = ({ handleChange, start, end, disabled, format, max }) => {
  const { t } = useTranslation();

  const formatted = format || getDateTimeFormat();
  const limit = max || 1095;

  const ranges = {
    [t('fields.today')]: [moment(), moment(), 'range'],
    [t('fields.thisWeek')]: [moment().startOf('week'), moment().endOf('week'), 'range'],
    [t('fields.thisMonth')]: [moment().startOf('month'), moment().endOf('month'), 'range'],
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
    if (dates[2] === 'range') {
      handleChange(dates[0].format(DATE_TIME_FORMAT), dates[1].format(DATE_TIME_FORMAT));
    }
  };

  return (
    <RangePicker
      allowClear={false}
      format={formatted}
      disabled={disabled || (!start && !end)}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      defaultValue={[moment(start, DATE_TIME_FORMAT), moment(end, DATE_TIME_FORMAT)]}
      value={[moment(start, DATE_TIME_FORMAT), moment(end, DATE_TIME_FORMAT)]}
      onOk={(dates) => onChange(dates)}
      onChange={(dates) => onRangeSelect(dates)}
      ranges={ranges}
    />
  );
};

export default Calendar;
