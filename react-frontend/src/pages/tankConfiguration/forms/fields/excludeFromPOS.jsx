import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromPOS extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        excl_from_pds: value.excl_from_pds
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item>
        {decorator("excl_from_pds", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Checkbox>Exclude from POS</Checkbox>)}
      </Form.Item>
    );
  }
}
