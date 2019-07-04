import React, { Component } from "react";
import { Form, Slider } from "antd";
import _ from "lodash";

export default class UserHLevel extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_uh_level: value.tank_uh_level === "" ? 0 : _.toInteger(value.tank_uh_level)
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
      <Form.Item label="User H Level">
        <div
          style={{
            float: "left",
            height: 250,
            marginRight: 30
          }}
        >
          {decorator("tank_uh_level")(
            <Slider
              vertical
              marks={marks}
              tipFormatter={value => {
                return `User H: ${value}`;
              }}
            />
          )}
        </div>
      </Form.Item>
    );
  }
}
