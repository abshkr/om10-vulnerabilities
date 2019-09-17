import React, { Component } from "react";
import { Form, Select } from "antd";
import { reportConfiguration } from "../../../../api";
import axios from "axios";

export default class Name extends Component {
  state = {
    reports: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([reportConfiguration.readReports()]).then(
      axios.spread(reports => {
        this.setState({
          reports: reports.data.records
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
    const { reports } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Report Name">
        {decorator("report_file", {
          rules: [{ required: true, message: "Please Select a Report Name" }]
        })(
          <Select disabled={!!value}>
            {reports.map((item, index) => (
              <Option key={index} value={item.report_file}>
                {item.report_name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
