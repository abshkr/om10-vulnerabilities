import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class OnDemandReport extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_ondemand_flag: value.report_ondemand_flag
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="On Demand Report">
        {decorator("report_ondemand_flag", { valuePropName: "checked" })(<Checkbox />)}
      </Form.Item>
    );
  }
}
