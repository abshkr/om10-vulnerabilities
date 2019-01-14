import React from "react";
import Animate from "react-smooth";
import { Form, DatePicker } from "antd";
import moment from "moment";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const steps = [
  {
    style: {
      opacity: 0
    },
    duration: 200
  }
];

const disabledDate = current => {
  return current && current > moment().endOf("day");
};

const DateRangeForm = ({ decorator, filter }) => {
  return (
    <div>
      {filter.includes("START_DATE") && filter.includes("END_DATE") && (
        <Animate attributeName="opacity" steps={steps}>
          <FormItem label="Date Range">
            {decorator("range", {
              rules: [{ required: true, message: "Please select a valid date range." }]
            })(
              <RangePicker
                disabledDate={disabledDate}
                ranges={{
                  "Last 24 Hours": [moment(), moment().subtract("1", "days")],
                  "Last 3 Days": [moment(), moment().subtract("3", "days")],
                  "Last 7 Days": [moment(), moment().subtract("7", "days")],
                  "Last 14 Days": [moment(), moment().subtract("14", "days")],
                  "Last 30 Days": [moment(), moment().subtract("30", "days")]
                }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
              />
            )}
          </FormItem>
        </Animate>
      )}
    </div>
  );
};

export default DateRangeForm;
