import React, { Component } from "react";
import { Form, Select } from "antd";
import { physicalPrinters } from "../../../../api";
import axios from "axios";

export default class Area extends Component {
  state = {
    area: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([physicalPrinters.readPrinterAreas()]).then(
      axios.spread(area => {
        this.setState({
          area: area.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        prntr_area: value.prntr_area
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { area } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Area">
        {decorator("prntr_area", {
          rules: [{ required: true, message: "Please Select An Area" }]
        })(
          <Select>
            {!!area &&
              area.map((item, index) => (
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
