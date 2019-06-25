import React, { Component } from "react";
import { Form, Select } from "antd";

export default class OwnerCarrier extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        owner_carrier: value.owner_carrier
      });
    }
  }

  render() {
    const { decorator, edit } = this.props;
    const options = ["Owner", "Carrier"];
    return (
      <Form.Item label="Owner/Carrier">
        {decorator("owner_carrier")(
          <Select disabled={edit}>
            {options.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
