import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default class BaseProductClassification extends Component {
  state = {
    classifications: null
  };

  componentDidMount() {
    axios.get(`https://10.1.10.66/api/base_prod/base_classes.php`).then(response => {
      this.setState({
        classifications: response.data.records
      });
    });
  }

  render() {
    const { decorator } = this.props;
    const { classifications } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Base Product Classifications">
        {decorator("base_class_desc", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <Select>
            {!!classifications &&
              classifications.map((item, index) => (
                <Option key={index} value={item.bclass_no}>
                  {item.bclass_desc}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
