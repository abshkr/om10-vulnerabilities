import React, { Component } from "react";
import { Form, Select, Checkbox, Divider } from "antd";

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

const options = [
  "BITUMEN AUX ROOM",
  "MAIN AUX ROOM",
  "CHEMICAL / OWN USE",
  "SCHEDULING ROOM",
  "LUBE AUX ROOM",
  "JETTY AUX ROOM",
  "TANK FARM",
  "TTLR AREA",
  "JETTY AREA",
  "LUBE AREA",
  "OFF SITE",
  "ON SITE",
  "GATE HOUSE"
];

export default class Lock extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_lock: value.per_lock
      });
    }
  }

  render() {
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
          {decorator("area_accesses")(<Checkbox.Group style={{ display: "flex", flexDirection: "column" }} disabled={getValue("per_lock") === "Y"} options={options} />)}
        </Form.Item>
      </div>
    );
  }
}
