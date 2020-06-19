import React from 'react';
import { DatePicker, notification } from 'antd';
import moment from 'moment';

import { getDateTimeFormat } from '../../utils';

import { useTranslation } from 'react-i18next';
import { DATE_TIME_FORMAT } from 'constants/settings';

const { RangePicker } = DatePicker;

const Calendar = ({ handleChange, start, end, disabled, format }) => {
  const { t } = useTranslation();

  const dateFormat = format || getDateTimeFormat();

  const ranges = {
    [t('fields.today')]: [moment(), moment()],
    [t('fields.thisWeek')]: [moment().startOf('week'), moment().endOf('week')],
    [t('fields.thisMonth')]: [moment().startOf('month'), moment().endOf('month')],
  };

  const onChange = (dates) => {
    const difference = dates[1]?.diff(dates[0], 'days');

    if (difference <= 30) {
      handleChange(dates[0].format(DATE_TIME_FORMAT), dates[1].format(DATE_TIME_FORMAT));
    } else {
      notification.warning({
        key: 'date-range-warning',
        message: t('messages.maxDateRange'),
        description: t('descriptions.maxDateRange'),
      });
    }
  };

  return (
    <RangePicker
      allowClear={false}
      format={dateFormat}
      disabled={disabled || (!start && !end)}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      defaultValue={[moment(start, DATE_TIME_FORMAT), moment(end, DATE_TIME_FORMAT)]}
      value={[moment(start, DATE_TIME_FORMAT), moment(end, DATE_TIME_FORMAT)]}
      onOk={(dates) => onChange(dates)}
      ranges={ranges}
    />
  );
};

export default Calendar;
