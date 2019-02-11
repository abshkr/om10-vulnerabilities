import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default class BaseProductGroup extends Component {
  state = {
    classifications: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/base_prod/prod_groups.php`).then(response => {
      this.setState({
        classifications: response.data.records
      });
    });

    if (!!value) {
      setValue({
        pgr_code: value.base_prod_group
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { classifications } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Base Product Group">
        {decorator("pgr_code", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <Select>
            {!!classifications &&
              classifications.map((item, index) => (
                <Option key={index} value={item.pgr_code}>
                  {item.pgr_text}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
