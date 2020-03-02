import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import { getDateTimeFormat } from '../../utils';

const { RangePicker } = DatePicker;

const Calendar = ({ handleChange, start, end, disabled }) => {
  const dateString = getDateTimeFormat();

  const format = `${dateString} HH:mm`;

  const handleDateChange = dates => {
    handleChange(dates[0].format('YYYY-MM-DD h:mm:ss'), dates[1].format('YYYY-MM-DD h:mm:ss'));
  };

  return (
    <RangePicker
      disabled={disabled}
      allowClear={false}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      format={format}
      defaultValue={[moment(start, 'YYYY-MM-DD HH:mm:ss'), moment(end, 'YYYY-MM-DD HH:mm:ss')]}
      onOk={dates => handleDateChange(dates)}
    />
  );
};

export default Calendar;
