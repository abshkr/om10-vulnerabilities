import React, { Component } from "react";
import { Select, Form } from "antd";
import axios from "axios";

export default class Supplier extends Component {
  state = {
    suppliers: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/idassignment/roles.php`).then(response => {
      this.setState({
        suppliers: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_supp_name: value.kya_supp_name
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const enabled = ["TANKER", "COMBINATION"];
    return (
      <Form.Item label="Supplier">
        {decorator("kya_supp_name")(
          <Select disabled={value.kya_supp_name === "" || !enabled.includes(value.kya_type_name)}>
            {this.state.suppliers.map((item, index) => (
              <Select.Option key={index} value={item.cmpy_code}>
                {item.cmpy_name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
