import React from "react";
import Animate from "react-smooth";
import { Form, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

const steps = [
  {
    style: {
      opacity: 0
    },
    duration: 200
  }
];

const CustomerForm = ({ decorator, filter, customers }) => {
  return (
    <div>
      {filter.includes("CUST_CODE") && (
        <Animate attributeName="opacity" steps={steps}>
          <FormItem label="Customer">
            {decorator("customer", {
              rules: [{ required: true, message: "Please select a customer." }]
            })(
              <Select
                showSearch
                disabled={!filter.includes("CUST_CODE")}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {customers &&
                  customers.map(item => {
                    return (
                      <Option key={item.cmpy_code} value={item.cmpy_code}>
                        {item.cmpy_name}
                      </Option>
                    );
                  })}
              </Select>
            )}
          </FormItem>
        </Animate>
      )}
    </div>
  );
};

export default CustomerForm;
