import React, { Component } from "react";
import { Form, Select } from "antd";

export default class GaugingMethod extends Component {
  state = {
    method: ["AUTOMATIC", "MANUAL"]
  };

  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_gaugingmthd_desc: value.tank_gaugingmthd_desc
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;
    return (
      <Form.Item label="Gauging Method">
        {decorator("tank_gaugingmthd_desc", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <Select>
            {this.state.method.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
