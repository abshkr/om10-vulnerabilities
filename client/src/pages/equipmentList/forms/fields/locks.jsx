import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class Locks extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        eqpt_lock: value.eqpt_lock === "Y" ? true : false,
        eqp_must_tare_in: value.eqp_must_tare_in === "Y" ? true : false
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Locks">
        {decorator("eqpt_lock", {
          valuePropName: "checked"
        })(<Checkbox> Locked? </Checkbox>)}

        {decorator("eqp_must_tare_in", {
          valuePropName: "checked"
        })(<Checkbox> Must Tare In? </Checkbox>)}
      </Form.Item>
    );
  }
}
