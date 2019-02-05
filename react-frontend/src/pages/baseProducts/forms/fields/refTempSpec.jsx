import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default class RefSpecTemp extends Component {
  state = {
    ref: null
  };

  componentDidMount() {
    axios.get(`https://10.1.10.66/api/base_prod/ref_temp_specs.php`).then(response => {
      this.setState({
        ref: response.data.records
      });
    });
  }

  render() {
    const { decorator } = this.props;
    const { ref } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Reference Temperature Specification">
        {decorator("base_ref_temp_spec", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <Select>
            {!!ref &&
              ref.map((item, index) => (
                <Option key={index} value={item.ref_temp_spec_id}>
                  {item.ref_temp_spec_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
