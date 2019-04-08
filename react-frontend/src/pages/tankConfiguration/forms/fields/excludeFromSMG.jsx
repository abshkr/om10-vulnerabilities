import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromSMG extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        excl_from_special_mv: value.excl_from_special_mv
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item>
        {decorator("excl_from_special_mv", {
          initialValue: false
        })(<Checkbox>Exclude from Special Movement Gain/Loss</Checkbox>)}
      </Form.Item>
    );
  }
}
