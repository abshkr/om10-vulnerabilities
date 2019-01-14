import React, { Component } from "react";
import { Checkbox, Form, Col } from "antd";
const CheckboxGroup = Checkbox.Group;

const editOptions = ["Locked?", "Adhoc?", "Remove Pin", "Reset Pin"];

const createOptions = [
  { label: "Locked?", value: "Locked?", disabled: false },
  { label: "Adhoc?", value: "Adhoc?", disabled: false },
  { label: "Remove Pin", value: "Remove Pin", disabled: true },
  { label: "Reset Pin", value: "Reset Pin", disabled: true }
];

export default class CheckList extends Component {
  render() {
    const { decorator, edit } = this.props;

    return (
      <Col span={24}>
        <Form.Item label="Checklist">
          {decorator("checklist")(<CheckboxGroup options={edit ? editOptions : createOptions} />)}
        </Form.Item>
      </Col>
    );
  }
}
