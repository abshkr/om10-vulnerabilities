import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { baseProducts } from "../../../../api";
export default class BaseProductGroup extends Component {
  state = {
    classifications: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([baseProducts.readBaseProductGroups()]).then(
      axios.spread(classifications => {
        this.setState({
          classifications: classifications.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        base_prod_group: value.base_prod_group
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { classifications } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Base Product Group">
        {decorator("base_prod_group", {
          rules: [{ required: false }]
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
