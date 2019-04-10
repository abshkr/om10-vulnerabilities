import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default class TankStatus extends Component {
  state = {
    status: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/pages/tank_status/status_types.php`).then(response => {
      this.setState({
        status: response.data.records
      });
    });

    if (!!value) {
      setValue({
        tank_status_name: value.tank_status_name
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;
    return (
      <Form.Item label="Tank Status">
        {decorator("tank_status_name", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <Select>
            {!!this.state.status &&
              this.state.status.map((item, index) => (
                <Option key={index} value={item.tank_status_name}>
                  {item.tank_status_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
