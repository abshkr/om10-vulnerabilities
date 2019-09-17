import React, { Component } from "react";
import { Form, Select } from "antd";
import { reportProfile } from "../../../../api";
import axios from "axios";

export default class Source extends Component {
  state = {
    options: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([reportProfile.readReports()]).then(
      axios.spread(options => {
        this.setState({
          options: options.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        report_file: value.report_file
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const { options } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Source">
        {decorator("report_file", {
          rules: [{ required: true, message: "Please Select a Report Source" }]
        })(
          <Select disabled={!!value}>
            {options.map((item, index) => (
              <Option key={index} value={item.report_file}>
                {item.report_jasper_file}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
