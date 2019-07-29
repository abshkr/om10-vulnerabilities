import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const ranges = {
  "Last 24 Hours": [moment(), moment().subtract("1", "days")],
  "Last 3 Days": [moment(), moment().subtract("3", "days")],
  "Last 7 Days": [moment(), moment().subtract("7", "days")],
  "Last 14 Days": [moment(), moment().subtract("14", "days")],
  "Last 30 Days": [moment(), moment().subtract("30", "days")]
};

const disabled = current => {
  return current && current > moment().endOf("day");
};

const handleDateChange = (dates, change) => {
  change(dates[0].format("YYYY-MM-DD h:mm"), dates[1].format("YYYY-MM-DD h:mm"));
};

const Calendar = ({ change, start, end }) => {
  return (
    <DatePicker.RangePicker
      allowClear={false}
      disabledDate={disabled}
      style={{ marginBottom: 10, marginLeft: 10 }}
      ranges={ranges}
      showTime={{ format: "HH:mm:ss" }}
      format="DD-MM-YYYY HH:mm"
      defaultValue={[moment(start, "YYYY-MM-DD HH:mm:ss"), moment(end, "YYYY-MM-DD HH:mm:ss")]}
      onOk={dates => handleDateChange(dates, change)}
    />
  );
};

export default Calendar;
