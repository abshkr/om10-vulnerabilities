import React, { Component } from "react";
import { Select, Form, Col } from "antd";
import _ from "lodash";

export default class Tanker extends Component {
  state = {
    tanker: [],
    isLoading: true
  };

  filterTankers = (carrier, tanker) => {
    if (tanker !== undefined) {
      tanker = _.filter(tanker, function(o) {
        return o.tnkr_carrier === carrier;
      });

      this.setState({ tanker, isLoading: false });
    }
  };

  componentDidMount() {
    const { tanker, values } = this.props;
    this.filterTankers(values.kya_supp_name, tanker);
  }

  componentDidUpdate(prevProps) {
    const { tanker, values } = this.props;
    if (prevProps !== this.props) {
      this.filterTankers(values.kya_supp_name, tanker);
    }

    if (prevProps.values.kya_supp_name !== this.props.values.kya_supp_name) {
      this.props.form.resetFields(["kya_tanker"]);
    }
  }

  render() {
    const { decorator, values } = this.props;
    const { tanker } = this.state;
    const enabled = ["TANKER", "COMBINATION"];
    return (
      <Col span={6}>
        <Form.Item
          label="Tanker"
          hasFeedback={!!values.kya_supp_name}
          validateStatus={!!values.kya_supp_name && tanker.length === 0 ? "warning" : "success"}
          help={!!values.kya_supp_name && tanker.length === 0 ? "There are no available Tankers" : ""}
        >
          {decorator("kya_tanker")(
            <Select
              disabled={
                values.kya_tanker === "" ||
                values.kya_tanker === undefined ||
                !enabled.includes(values.kya_type_name)
              }
            >
              {tanker.map((item, index) => (
                <Select.Option key={index} value={item.tnkr_code}>
                  {item.tnkr_code}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
