import React, { Component } from "react";
import { Form, Input } from "antd";

export default class DriverLicence extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_licence_no: value.per_licence_no
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return <Form.Item label="Driver Licence">{decorator("per_licence_no")(<Input />)}</Form.Item>;
  }
}
