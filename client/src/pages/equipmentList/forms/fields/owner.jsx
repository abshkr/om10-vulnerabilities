import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { equipmentList } from "../../../../api";

export default class Owner extends Component {
  state = {
    owners: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([equipmentList.readOwners()]).then(
      axios.spread(owners => {
        this.setState({
          owners: owners.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        eqpt_owner: value.eqpt_owner
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const { owners } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Owners">
        {decorator("eqpt_owner", {
          rules: [{ required: false }]
        })(
          <Select disabled={!!value}>
            {owners.map((item, index) => (
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
