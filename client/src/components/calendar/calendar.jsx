import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import { getDateTimeFormat } from '../../utils';

const Calendar = ({ handleChange, start, end, disabled }) => {
  const dateString = getDateTimeFormat();
  const format = `${dateString} HH:mm`;

  const handleDateChange = dates => {
    handleChange(dates[0].format('YYYY-MM-DD h:mm:ss'), dates[1].format('YYYY-MM-DD h:mm:ss'));
  };

  const disabledRange = current => {
    return current && current > moment().endOf('day');
  };

  return (
    <DatePicker.RangePicker
      disabled={disabled}
      allowClear={false}
      disabledDate={disabledRange}
      style={{ marginLeft: 5 }}
      showTime={{ format: 'HH:mm:ss' }}
      format={format}
      defaultValue={[moment(start, 'YYYY-MM-DD HH:mm:ss'), moment(end, 'YYYY-MM-DD HH:mm:ss')]}
      onOk={dates => handleDateChange(dates)}
    />
  );
};

export default Calendar;
