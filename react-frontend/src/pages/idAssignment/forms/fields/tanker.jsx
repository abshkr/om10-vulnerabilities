import React, { Component } from "react";
import { Select, Form } from "antd";
import axios from "axios";

export default class Tanker extends Component {
  state = {
    tanker: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/idassignment/tankers.php`).then(response => {
      this.setState({
        tanker: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_tanker: value.kya_tanker
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const enabled = ["TANKER", "COMBINATION"];
    return (
      <Form.Item label="Tanker">
        {decorator("kya_tanker")(
          <Select
            disabled={
              value.kya_tanker === "" ||
              value.kya_tanker === undefined ||
              !enabled.includes(value.kya_type_name)
            }
          >
            {this.state.tanker.map((item, index) => (
              <Select.Option key={index} value={item.tnkr_code}>
                {item.tnkr_code}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
