import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default class CorrectionMethod extends Component {
  state = {
    method: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/base_prod/corr_mthds.php`).then(response => {
      this.setState({
        method: response.data.records
      });
    });

    if (!!value) {
      setValue({
        base_corr_mthd: value.base_corr_mthd
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { method } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Correction Method">
        {decorator("base_corr_mthd", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <Select>
            {!!method &&
              method.map((item, index) => (
                <Option key={index} value={item.compensation_id}>
                  {item.compensation_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
