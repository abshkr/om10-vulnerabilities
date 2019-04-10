import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";

const { Option } = Select;

export default class AssignmenType extends Component {
  state = {
    assignment: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.get(`https://10.1.10.66/api/pages/idassignment/assignment_types.php`).then(response => {
      this.setState({
        assignment: response.data.records
      });
    });

    if (!!value) {
      setValue({
        kya_type_name: value.kya_type_name
      });
    }
  }

  render() {
    const { edit, decorator } = this.props;
    return (
      <Form.Item label="Assignment Type">
        {decorator("kya_type_name", {
          rules: [{ required: true, message: "Please Select a Type" }]
        })(
          <Select disabled={edit}>
            {this.state.assignment.map((item, index) => (
              <Option key={index} value={item.type_name}>
                {item.type_name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
