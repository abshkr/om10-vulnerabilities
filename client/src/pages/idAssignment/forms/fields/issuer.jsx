import React, { Component } from "react";
import axios from "axios";
import { Form, Select } from "antd";
const { Option } = Select;

export default class Issuer extends Component {
  state = {
    issuer: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/pages/idassignment/issuers.php`).then(response => {
      this.setState({
        issuer: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_issuer_name: value.kya_issuer_name
      });
    }
  }

  render() {
    const { edit, decorator } = this.props;
    return (
      <Form.Item label="Issuer">
        {decorator("kya_issuer_name", {
          rules: [{ required: true, message: "Please Fill the Issuer" }]
        })(
          <Select disabled={edit}>
            {this.state.issuer.map((item, index) => (
              <Option key={index} value={item.cmpy_name}>
                {item.cmpy_name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
