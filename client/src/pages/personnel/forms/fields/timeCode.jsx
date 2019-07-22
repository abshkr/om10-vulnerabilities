import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { personnel } from "../../../../api";

export default class TimeCode extends Component {
  state = {
    timeCodes: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([personnel.readPersonnelTimeCodes()]).then(
      axios.spread(timeCodes => {
        this.setState({
          isLoading: false,
          timeCodes: timeCodes.data.records,
          filtered: null,
          value: ""
        });
      })
    );

    if (!!value) {
      setValue({
        pt_timecd: value.pt_timecd
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { timeCodes } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Time Code">
        {decorator("pt_timecd")(
          <Select loading={timeCodes === null}>
            {!!timeCodes &&
              timeCodes.map((item, index) => (
                <Option key={index} value={item.tcd_title}>
                  {item.tcd_title}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
