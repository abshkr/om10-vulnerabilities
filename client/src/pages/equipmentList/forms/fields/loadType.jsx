import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { equipmentList } from "../../../../api";

export default class LoadType extends Component {
  state = {
    types: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([equipmentList.readLoadTypes()]).then(
      axios.spread(types => {
        this.setState({
          types: types.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        eqpt_load_type: value.eqpt_load_type
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { types } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Load Type">
        {decorator("eqpt_load_type", {
          rules: [{ required: false }]
        })(
          <Select>
            {types.map((item, index) => (
              <Option key={index} value={item.ld_type_code}>
                {item.ld_type_text}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
