import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class Enable extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_enabled: value.report_enabled
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Enable the report usage for company">
        {decorator("report_enabled")(<Checkbox />)}
      </Form.Item>
    );
  }
}
