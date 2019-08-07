import React, { Component } from "react";
import { Form, Select } from "antd";
import { baseProducts } from "../../../../api";
import axios from "axios";

export default class Company extends Component {
  state = {
    companies: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([baseProducts.readBaseProductClassification()]).then(
      axios.spread(companies => {
        this.setState({
          companies: companies.data.records
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
    const { companies } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Report Name">
        {decorator("report_name", {
          rules: [{ required: true, message: "Please Select a Report" }]
        })(
          <Select>
            {!!companies &&
              companies.map((item, index) => (
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
