import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default class Product extends Component {
  state = {
    classifications: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/tank/base_list.php`).then(response => {
      this.setState({
        classifications: response.data.records
      });
    });

    if (!!value) {
      setValue({
        tank_base: value.tank_base
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { classifications } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Product">
        {decorator("tank_base", {
          rules: [{ required: true, message: "please enter a product" }]
        })(
          <Select>
            {!!classifications &&
              classifications.map((item, index) => (
                <Option key={index} value={item.base_code}>
                  {item.base_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
