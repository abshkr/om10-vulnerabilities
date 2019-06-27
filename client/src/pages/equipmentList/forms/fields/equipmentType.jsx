import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { equipmentList } from "../../../../api";

export default class EquipmentType extends Component {
  state = {
    types: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([equipmentList.readEquipmentTypes()]).then(
      axios.spread(types => {
        this.setState({
          types: types.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        eqpt_etp: value.eqpt_etp
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const { types } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Equipment Type">
        {decorator("eqpt_etp", {
          rules: [{ required: false }]
        })(
          <Select disabled={!!value}>
            {types.map((item, index) => (
              <Option key={index} value={item.etyp_id}>
                {item.etyp_title}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
