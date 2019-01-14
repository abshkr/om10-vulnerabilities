import React from "react";
import { Form, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

const SupplierForm = ({ decorator, supplier, change }) => {
  return (
    <FormItem label="Supplier">
      {decorator("supplier", {
        rules: [{ required: true, message: "Please select a supplier." }]
      })(
        <Select
          showSearch
          onChange={value => change(value)}
          placeholder="Please select your supplier"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {supplier &&
            supplier.map(item => {
              return (
                <Option key={item.cmpy_code} value={item.cmpy_code}>
                  {item.cmpy_name}
                </Option>
              );
            })}
        </Select>
      )}
    </FormItem>
  );
};

export default SupplierForm;
