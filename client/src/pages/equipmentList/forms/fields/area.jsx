import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { equipmentList } from "../../../../api";

export default class Area extends Component {
  state = {
    areas: []
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([equipmentList.readAreas()]).then(
      axios.spread(areas => {
        this.setState({
          areas: areas.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        eqpt_area: value.eqpt_area
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { areas } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Area">
        {decorator("eqpt_area", {
          rules: [{ required: false }]
        })(
          <Select>
            {areas.map((item, index) => (
              <Option key={index} value={item.area_k}>
                {item.area_name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
