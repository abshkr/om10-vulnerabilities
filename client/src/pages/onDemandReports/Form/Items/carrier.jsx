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

const CarrierForm = ({ decorator, filter, carriers }) => {
  return (
    <div>
      {filter.includes("CARR_CODE") && (
        <Animate attributeName="opacity" steps={steps}>
          <FormItem label="Carrier">
            {decorator("carrier", {
              rules: [{ required: true, message: "Please select a report." }]
            })(
              <Select
                showSearch
                disabled={!filter.includes("CARR_CODE")}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {carriers &&
                  carriers.map(item => {
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

export default CarrierForm;
