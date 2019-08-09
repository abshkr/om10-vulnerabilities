import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class CanReceiveByPrinting extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_canprint: value.report_canprint
      });
    }
  }

  render() {
    const { decorator, getValue } = this.props;

    const status = getValue("report_enabled");
    const enabled = !!status ? status : false;

    return (
      <Form.Item label="Company can receive the report by printing">
        {decorator("report_canprint")(<Checkbox disabled={!enabled} />)}
      </Form.Item>
    );
  }
}
