import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default class Employer extends Component {
  state = {
    employers: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/pages/personnel/employers.php`).then(response => {
      this.setState({
        employers: response.data.records
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
    const { employers } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Correction Method">
        {decorator("base_corr_mthd", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <Select>
            {!!employers &&
              employers.map((item, index) => (
                <Option key={index} value={item.cmpy_name}>
                  {item.cmpy_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
