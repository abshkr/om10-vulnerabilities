import React from "react";
import { Form, Radio } from "antd";

const FormItem = Form.Item;

const OutputForm = ({ decorator }) => {
  return (
    <FormItem>
      {decorator("output", {
        initialValue: "csv"
      })(
        <Radio.Group>
          <Radio value="csv">CSV</Radio>
          <Radio value="excel">Excel</Radio>
          <Radio value="pdf">PDF</Radio>
          <Radio value="word">Word</Radio>
          <Radio value="html">HTML</Radio>
        </Radio.Group>
      )}
    </FormItem>
  );
};

export default OutputForm;
