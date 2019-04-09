import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromStockReports extends Component {
  render() {
    const { decorator, value } = this.props;
    const state = !!value && value.tank_excl_from_stock_rep === "true" ? true : false;
    return (
      <Form.Item>
        {decorator("tank_excl_from_stock_rep", { valuePropName: "checked", initialValue: state })(
          <Checkbox>Exclude from Stock Reports</Checkbox>
        )}
      </Form.Item>
    );
  }
}
