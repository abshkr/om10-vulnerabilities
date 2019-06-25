import React, { Component } from "react";
import { Select, Form } from "antd";
import axios from "axios";

export default class Employer extends Component {
  state = {
    employer: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/pages/idassignment/employers.php`).then(response => {
      this.setState({
        employer: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_cust_name: value.kya_cust_name
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const enabled = ["SUPERVISOR", "Personnel", "COMBINATION"];
    return (
      <Form.Item label="Employer">
        {decorator("kya_cust_name")(
          <Select disabled={value.kya_draw_name === "" || !enabled.includes(value.kya_type_name)}>
            {this.state.employer.map((item, index) => (
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
