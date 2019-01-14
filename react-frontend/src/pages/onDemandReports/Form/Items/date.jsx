import React from "react";
import Animate from "react-smooth";
import { Form, DatePicker } from "antd";

const FormItem = Form.Item;

const steps = [
  {
    style: {
      opacity: 0
    },
    duration: 200
  }
];

const DateForm = ({ decorator, filter }) => {
  return (
    <div>
      {filter.includes("START_DATE") &&
        !filter.includes("END_DATE") && (
          <Animate attributeName="opacity" steps={steps}>
            <FormItem label="Date">
              {decorator("date", {
                rules: [{ required: true, message: "Please select a valid date." }]
              })(
                <DatePicker
                  disabledDate={this.disabledDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Select Time"
                />
              )}
            </FormItem>
          </Animate>
        )}
    </div>
  );
};

export default DateForm;
