import React, { Component } from "react";

import { Form, Select, Checkbox, Divider } from "antd";
import { personnel } from "../../../../api";
import axios from "axios";
import _ from "lodash";

const values = [
  {
    key: "Yes",
    value: "Y"
  },
  {
    key: "No",
    value: "N"
  }
];

export default class Lock extends Component {
  state = {
    areas: [],
    isLoading: false
  };

  handleAreaConversion = values => {
    const payload = [];

    _.forEach(values, object => {
      payload.push({
        label: object.area_name,
        value: object.area_k
      });
    });

    return payload;
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    this.setState({ isLoading: true });

    axios.all([personnel.readPersonnelAreas()]).then(
      axios.spread(areas => {
        this.setState({
          isLoading: false,
          areas: this.handleAreaConversion(areas.data.records)
        });
      })
    );

    if (!!value) {
      setValue({
        per_lock: value.per_lock,
        area_accesses: value.area_accesses
      });
    }
  }

  render() {
    const { areas, isLoading } = this.state;
    const { decorator, getValue } = this.props;
    const { Option } = Select;

    return (
      <div className="personnel-lock">
        <Form.Item label="Lock Out">
          {decorator("per_lock")(
            <Select>
              {values.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.key}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Divider />
        <Form.Item label="">
          {decorator("area_accesses")(<Checkbox.Group style={{ display: "flex", flexDirection: "column" }} disabled={getValue("per_lock") === "Y" || isLoading} options={areas} />)}
        </Form.Item>
      </div>
    );
  }
}
