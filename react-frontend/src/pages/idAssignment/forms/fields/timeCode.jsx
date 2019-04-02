import React, { Component } from "react";
import { Form, Select } from "antd";
const { Option } = Select;

export default class TimeCode extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        kya_timecode: value.kya_timecode
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Time Code">
        {decorator("kya_timecode")(
          <Select>
            <Option value="AL">AL</Option>
          </Select>
        )}
      </Form.Item>
    );
  }
}
