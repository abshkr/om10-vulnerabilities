import React, { Component } from "react";
import { Form, Select } from "antd";
import { tanks } from "../../../../api";
import axios from "axios";

export default class Product extends Component {
  state = {
    classifications: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([tanks.readBaseList()]).then(
      axios.spread(response => {
        this.setState({
          classifications: response.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        tank_base: value.tank_base
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { classifications } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Product">
        {decorator("tank_base", {
          rules: [{ required: true, message: "Please choose a Product." }]
        })(
          <Select showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {!!classifications &&
              classifications.map((item, index) => (
                <Option key={index} value={item.base_code}>
                  {`${item.base_name} / ${item.base_code}`}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
