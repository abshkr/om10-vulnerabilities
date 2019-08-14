import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class CloseOutReport extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_closeout_flag: value.report_closeout_flag
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Close Out Report">
        {decorator("report_closeout_flag", { valuePropName: "checked" })(<Checkbox />)}
      </Form.Item>
    );
  }
}
