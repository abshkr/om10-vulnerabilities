import React, { Component } from "react";
import { Checkbox, Form, Col } from "antd";
const CheckboxGroup = Checkbox.Group;

const editOptions = ["Locked?", "Adhoc?", "Remove Pin", "Reset Pin"];

const createOptions = [
  { label: "Locked?", value: "locked", disabled: false },
  { label: "Adhoc?", value: "adhoc", disabled: false },
  { label: "Remove Pin", value: "remove_pin", disabled: true },
  { label: "Reset Pin", value: "reset_pin", disabled: true }
];

export default class CheckList extends Component {
  render() {
    const { decorator, edit } = this.props;

    return (
      <Col span={24}>
        <Form.Item label="checklist">
          {decorator("checklist")(<CheckboxGroup options={edit ? editOptions : createOptions} />)}
        </Form.Item>
      </Col>
    );
  }
}
