import React, { useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import { getDateTimeFormat } from '../../utils';

const { RangePicker } = DatePicker;

const Calendar = ({ handleChange, start, end, disabled }) => {
  const format = getDateTimeFormat();

  const handleDateChange = (dates) => {
    handleChange(dates[0].format('YYYY-MM-DD HH:mm:ss'), dates[1].format('YYYY-MM-DD HH:mm:ss'));
  };

  return (
    <RangePicker
      disabled={disabled}
      allowClear={false}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      format={format}
      defaultValue={[moment(start, 'YYYY-MM-DD HH:mm:ss'), moment(end, 'YYYY-MM-DD HH:mm:ss')]}
      value={[moment(start, 'YYYY-MM-DD HH:mm:ss'), moment(end, 'YYYY-MM-DD HH:mm:ss')]}
      onChange={(dates) => handleDateChange(dates)}
      onOk={(dates) => handleDateChange(dates)}
      onPanelChange={(value) => console.log(value)}
      ranges={{
        Today: [moment(), moment()],
        'This Week': [moment().startOf('week'), moment().endOf('week')],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'This Year': [moment().startOf('year'), moment().endOf('year')],
      }}
    />
  );
};

export default Calendar;
