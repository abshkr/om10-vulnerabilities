import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Comments extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        eqpt_comments: value.eqpt_comments
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return <Form.Item label="Comments">{decorator("eqpt_comments")(<Input.TextArea />)}</Form.Item>;
  }
}
