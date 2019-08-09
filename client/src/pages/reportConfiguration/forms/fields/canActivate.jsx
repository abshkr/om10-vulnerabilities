import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class CanActivate extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_closeout_flag: value.report_closeout_flag
      });
    }
  }

  render() {
    const { decorator, getValue } = this.props;

    const status = getValue("report_enabled");
    const enabled = !!status ? status : false;

    return (
      <Form.Item label="Company can activate the report usage">
        {decorator("report_closeout_flag")(<Checkbox disabled={!enabled} />)}
      </Form.Item>
    );
  }
}
