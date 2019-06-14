import React, { Component } from "react";
import { Form, Select } from "antd";
import { logicalPrinters } from "../../../../api";
import axios from "axios";

export default class Company extends Component {
  state = {
    companies: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([logicalPrinters.readLogicalPrinters()]).then(
      axios.spread(companies => {
        this.setState({
          companies: companies.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        prt_cmpy: value.prt_cmpy
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { companies } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Company">
        {decorator("prt_cmpy", {
          rules: [{ required: true, message: "Please Select a Company" }]
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
