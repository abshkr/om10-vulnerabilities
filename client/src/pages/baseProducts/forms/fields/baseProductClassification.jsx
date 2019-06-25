import React, { Component } from "react";
import { Form, Select } from "antd";
import { baseProducts } from "../../../../api";
import axios from "axios";

export default class BaseProductClassification extends Component {
  state = {
    classifications: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([baseProducts.readBaseProductClassification()]).then(
      axios.spread(classifications => {
        this.setState({
          classifications: classifications.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        base_cat: value.base_cat
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { classifications } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Base Product Classifications">
        {decorator("base_cat", {
          rules: [{ required: true, message: "Please Select a Classification" }]
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
