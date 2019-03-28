import React, { Component } from "react";
import { Select, Form } from "antd";
import axios from "axios";

export default class Drawer extends Component {
  state = {
    drawer: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/idassignment/drawers.php`).then(response => {
      this.setState({
        drawer: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_type_name: value.kya_type_name
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const enabled = ["Personnel", "COMBINATION"];
    return (
      <Form.Item label="Drawer">
        {decorator("kya_draw_name")(
          <Select disabled={value.kya_draw_name === "" || !enabled.includes(value.kya_type_name)}>
            {this.state.drawer.map((item, index) => (
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
