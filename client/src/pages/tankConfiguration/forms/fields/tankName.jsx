import React, { Component } from "react";
import { Form, Input } from "antd";

export default class TankName extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_name: value.tank_name
      });
    }
  }

  handleTankNameValidation = (rule, value, callback) => {
    if (value && value.length > 30) {
      callback("Tank Name must be under 30 characters.");
    }
    callback();
  };

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Tank Name">
        {decorator("tank_name", {
          rules: [
            { required: false, message: "Please Enter a Tank Name." },
            {
              validator: this.handleTankNameValidation
            }
          ]
        })(<Input />)}
      </Form.Item>
    );
  }
}
