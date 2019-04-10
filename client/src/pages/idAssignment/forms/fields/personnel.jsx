import React, { Component } from "react";
import { Select, Form } from "antd";
import axios from "axios";

export default class Personnel extends Component {
  state = {
    personnel: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/pages/idassignment/personnel.php`).then(response => {
      this.setState({
        personnel: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_psnl_name: value.kya_psnl_name
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const enabled = ["SUPERVISOR", "Personnel", "COMBINATION"];
    const disabled = !!value ? value.kya_psnl_name === "" || !enabled.includes(value.kya_type_name) : false;
    return (
      <Form.Item label="Personnel">
        {decorator("kya_psnl_name")(
          <Select disabled={disabled}>
            {this.state.personnel.map((item, index) => (
              <Select.Option key={index} value={item.per_code}>
                {item.per_name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
