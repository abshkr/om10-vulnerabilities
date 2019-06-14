import React, { Component } from "react";
import { Form, Select } from "antd";
import { logicalPrinters } from "../../../../api";
import axios from "axios";

export default class Printer extends Component {
  state = {
    printer: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([logicalPrinters.readPhysicalPrinters()]).then(
      axios.spread(printer => {
        this.setState({
          printer: printer.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        prt_printer: value.prt_printer
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { printer } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Printer">
        {decorator("prt_printer", {
          rules: [{ required: true, message: "Please Select a Printer" }]
        })(
          <Select>
            {!!printer &&
              printer.map((item, index) => (
                <Option key={index} value={item.prntr}>
                  {item.prntr} - {item.sys_prntr}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
