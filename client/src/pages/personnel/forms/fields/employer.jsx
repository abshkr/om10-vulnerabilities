import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { personnel } from "../../../../api";

export default class Employer extends Component {
  state = {
    employers: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([personnel.readPersonnelEmployers()]).then(
      axios.spread(employers => {
        this.setState({
          isLoading: false,
          employers: employers.data.records,
          filtered: null,
          value: ""
        });
      })
    );

    if (!!value) {
      setValue({
        per_cmpy: value.per_cmpy
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { employers } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Employer">
        {decorator("per_cmpy", {
          rules: [{ required: true, message: "Please Select An Employer." }]
        })(
          <Select loading={employers === null}>
            {!!employers &&
              employers.map((item, index) => (
                <Option key={index} value={item.cmpy_code}>
                  {item.cmpy_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
