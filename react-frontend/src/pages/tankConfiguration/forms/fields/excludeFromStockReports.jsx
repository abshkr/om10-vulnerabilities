import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromStockReports extends Component {
  render() {
    const { decorator, value } = this.props;
    const state = !!value && value.tank_exc_stckrpt;

    return (
      <Form.Item>
        {decorator("tank_exc_stckrpt", { valuePropName: "checked", initialValue: state })(
          <Checkbox>Exclude from Stock Reports</Checkbox>
        )}
      </Form.Item>
    );
  }
}
