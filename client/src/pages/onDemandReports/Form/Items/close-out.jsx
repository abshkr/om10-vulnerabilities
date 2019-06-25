import React from "react";
import Animate from "react-smooth";
import { Form, Slider } from "antd";

const FormItem = Form.Item;

const steps = [
  {
    style: {
      opacity: 0
    },
    duration: 200
  }
];

const CloseOutForm = ({ decorator, filter, min, max, formatter }) => {
  return (
    <div>
      {filter.includes("START_NR") &&
        !filter.includes("END_NR") && (
          <Animate attributeName="opacity" steps={steps}>
            <FormItem label="Close Out">
              {decorator("closeOut", {
                rules: [{ required: true, message: "Please select a valid close out." }]
              })(<Slider min={min} max={max} tipFormatter={formatter} />)}
            </FormItem>
          </Animate>
        )}
    </div>
  );
};

export default CloseOutForm;
