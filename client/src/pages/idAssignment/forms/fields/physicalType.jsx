import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

const { Option } = Select;

export default class PhysicalType extends Component {
  state = {
    physicalType: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/idassignment/physical_types.php`).then(response => {
      this.setState({
        physicalType: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_phys_name: value.kya_phys_name
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Physical Type">
        {decorator("kya_phys_name", {
          rules: [{ required: true, message: "Please Select a Type" }]
        })(
          <Select>
            {this.state.physicalType.map((item, index) => (
              <Option key={index} value={item.key_phys_name}>
                {item.key_phys_name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
