import React, { Component } from "react";
import { Form, Slider } from "antd";
import _ from "lodash";

export default class UserLLevel extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_ul_level: value.tank_ul_level === "" ? 0 : _.toInteger(value.tank_ul_level)
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const marks = {
      0: "0%",
      100: "100%"
    };

    return (
      <Form.Item label="User L Level">
        <div
          style={{
            float: "left",
            height: 250,
            marginLeft: 20
          }}
        >
          {decorator("tank_ul_level")(
            <Slider
              vertical
              marks={marks}
              tipFormatter={value => {
                return `User L: ${value}`;
              }}
            />
          )}
        </div>
      </Form.Item>
    );
  }
}
