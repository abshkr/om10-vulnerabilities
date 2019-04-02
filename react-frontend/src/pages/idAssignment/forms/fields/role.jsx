import React, { Component } from "react";
import { Select, Form } from "antd";
import axios from "axios";

export default class Role extends Component {
  state = {
    role: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/idassignment/roles.php`).then(response => {
      this.setState({
        role: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_role_name: value.kya_role_name
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const enabled = ["SUPERVISOR", "Personnel", "COMBINATION"];
    return (
      <Form.Item label="Role">
        {decorator("kya_role_name")(
          <Select disabled={value.kya_role_name === "" || !enabled.includes(value.kya_type_name)}>
            {this.state.role.map((item, index) => (
              <Select.Option key={index} value={item.role_id}>
                {item.role_name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
