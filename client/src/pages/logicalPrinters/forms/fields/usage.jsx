import React, { Component } from "react";
import { Form, Select } from "antd";
import { logicalPrinters } from "../../../../api";
import axios from "axios";

export default class Usage extends Component {
  state = {
    usage: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([logicalPrinters.readLogicalPrinters()]).then(
      axios.spread(usage => {
        this.setState({
          usage: usage.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        prt_usage_name: value.prt_usage_name
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { usage } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Usage">
        {decorator("prt_usage_name", {
          rules: [{ required: true, message: "Please Select a Usage" }]
        })(
          <Select>
            {!!usage &&
              usage.map((item, index) => (
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
