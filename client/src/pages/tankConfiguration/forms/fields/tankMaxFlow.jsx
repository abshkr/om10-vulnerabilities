import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class TankMaxFlow extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      const values = {};

      _.forEach(value.tank_max_flow, (data, index) => {
        values[`tank_max_flow.${index}.tank_level`] = data.tank_level;
        values[`tank_max_flow.${index}.flow_rate`] = data.flow_rate;
      });

      setValue(values);
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <div>
        <Form.Item label="Flow Configuration Stage 1">
          {decorator("tank_max_flow.0.tank_level")(<Input addonBefore="Tank Level" />)}
          {decorator("tank_max_flow.0.flow_rate")(<Input addonBefore="Flow Rate ⁮⁮⁮⁮⁮⁮⁮⁮" />)}
        </Form.Item>
        <Form.Item label="Flow Configuration Stage 2">
          {decorator("tank_max_flow.1.tank_level")(<Input addonBefore="Tank Level" />)}
          {decorator("tank_max_flow.1.flow_rate")(<Input addonBefore="Flow Rate " />)}
        </Form.Item>
        <Form.Item label="Flow Configuration Stage 3">
          {decorator("tank_max_flow.2.tank_level")(<Input addonBefore="Tank Level" />)}
          {decorator("tank_max_flow.2.flow_rate")(<Input addonBefore="Flow Rate " />)}
        </Form.Item>
        <Form.Item label="Flow Configuration Stage 4">
          {decorator("tank_max_flow.3.tank_level")(<Input addonBefore="Tank Level" />)}
          {decorator("tank_max_flow.3.flow_rate")(<Input addonBefore="Flow Rate " />)}
        </Form.Item>
      </div>
    );
  }
}
