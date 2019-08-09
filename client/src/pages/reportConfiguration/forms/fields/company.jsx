import React, { Component } from "react";
import { Form, Select } from "antd";
import { reportConfiguration } from "../../../../api";
import axios from "axios";

export default class Company extends Component {
  state = {
    companies: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([reportConfiguration.readCompany()]).then(
      axios.spread(companies => {
        this.setState({
          companies: companies.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        report_cmpycode: value.report_cmpycode
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { companies } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Company Name">
        {decorator("report_cmpycode", {
          rules: [{ required: true, message: "Please Select a Report" }]
        })(
          <Select>
            {!!companies &&
              companies.map((item, index) => (
                <Option key={index} value={item.cmpy_code}>
                  {item.cmpy_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
