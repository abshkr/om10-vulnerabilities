import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Comment extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_comments: value.per_comments
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return <Form.Item label="Comments">{decorator("per_comments")(<Input.TextArea />)}</Form.Item>;
  }
}
