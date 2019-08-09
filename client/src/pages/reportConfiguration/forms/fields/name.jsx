import React, { Component } from "react";
import { Form, Select } from "antd";
import { reportConfiguration } from "../../../../api";
import axios from "axios";

export default class Name extends Component {
  state = {
    reports: null
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
        report_name: value.report_name
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { reports } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Report Name">
        {decorator("report_name", {
          rules: [{ required: true, message: "Please Select a Report Name" }]
        })(
          <Select>
            {!!reports &&
              reports.map((item, index) => (
                <Option key={index} value={item.bclass_no}>
                  {item.bclass_desc}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
