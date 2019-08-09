import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class CanReceiveByEmail extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_canemail: value.report_canemail
      });
    }
  }

  render() {
    const { decorator, getValue } = this.props;

    const status = getValue("report_enabled");
    const enabled = !!status ? status : false;

    return (
      <Form.Item label="Company can receive the report by email">
        {decorator("report_canemail")(<Checkbox disabled={!enabled} />)}
      </Form.Item>
    );
  }
}
