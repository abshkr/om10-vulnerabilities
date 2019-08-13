import React from "react";
import { Form, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

const ReportsForm = ({ decorator, reports, getFilter, loading, validator }) => {
  return (
    <FormItem label="Report" hasFeedback>
      {decorator("report", {
        rules: [{ required: true, message: "Please select a report." }]
      })(
        <Select
          showSearch
          disabled={validator.supplier === ""}
          onChange={value => getFilter(value)}
          placeholder="Please select your report"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {reports &&
            reports.map(item => {
              return (
                <Option key={item.rpt_file} value={item.rpt_file}>
                  {item.report}
                </Option>
              );
            })}
        </Select>
      )}
    </FormItem>
  );
};

export default ReportsForm;
