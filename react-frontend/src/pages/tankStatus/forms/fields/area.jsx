import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default class Area extends Component {
  state = {
    area: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/tank_status/areas.php`).then(response => {
      this.setState({
        area: response.data.records
      });
    });

    if (!!value) {
      setValue({
        tank_location: value.tank_location
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;
    return (
      <Form.Item label="Area">
        {decorator("tank_location", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <Select>
            {!!this.state.area &&
              this.state.area.map((item, index) => (
                <Option key={index} value={item.area_name}>
                  {item.area_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
