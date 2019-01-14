import React, { Component } from "react";
import { Form, Input, Col } from "antd";
import axios from "axios";

export default class TagText extends Component {
  state = {
    array: []
  };

  // 0000010C2CC6
  duplicateChecker = (rule, value, callback) => {
    if (this.state.array.includes(value)) {
      callback("This Tag Already exists");
    } else {
      callback();
    }
  };

  componentDidMount() {
    axios.get(`https://10.1.10.66/api/idassignment/kyatxt_list.php`).then(res => {
      const array = res.data.records;
      this.setState({ array });
    });
  }

  render() {
    const { decorator } = this.props;
    return (
      <Col span={6}>
        <Form.Item label="Physical Tag Text">
          {decorator("kya_txt", {
            rules: [
              { required: true, message: "Please Fill the Tag Text" },
              { validator: this.duplicateChecker }
            ]
          })(<Input />)}
        </Form.Item>
      </Col>
    );
  }
}
