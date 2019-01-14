import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

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

export default class Calendar extends Component {
  render() {
    const { change, start, end } = this.props;
    return (
      <RangePicker
        disabledDate={disabled}
        style={{ marginBottom: 10, marginRight: 10 }}
        ranges={ranges}
        showTime={{ format: "HH:mm" }}
        format="DD-MM-YYYY HH:mm"
        placeholder={[start, end]}
        onOk={change}
      />
    );
  }
}
