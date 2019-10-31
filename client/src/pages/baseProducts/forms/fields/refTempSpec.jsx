import React, { Component } from "react";
import { Form, Select } from "antd";
import { baseProducts } from "../../../../api";
import axios from "axios";

export default class RefSpecTemp extends Component {
  state = {
    ref: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([baseProducts.readBaseProductRefTemp()]).then(
      axios.spread(ref => {
        this.setState({
          ref: ref.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        base_ref_temp_spec: value.base_ref_temp_spec
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { ref } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Reference Temperature Specification">
        {decorator("base_ref_temp_spec", {
          rules: [{ required: false }]
        })(
          <Select>
            {!!ref &&
              ref.map((item, index) => (
                <Option key={index} value={item.ref_temp_spec_id}>
                  {item.ref_temp_spec_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
