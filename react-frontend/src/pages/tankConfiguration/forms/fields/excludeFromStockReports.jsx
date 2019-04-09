import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromStockReports extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_excl_from_stock_rep: value.tank_excl_from_stock_rep
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const checked = !!value && value.tank_excl_from_stock_rep === "true" ? "checked" : "unchecked";

    return (
      <Form.Item>
        {decorator("tank_excl_from_stock_rep", { valuePropName: checked })(
          <Checkbox>Exclude from Stock Reports</Checkbox>
        )}
      </Form.Item>
    );
  }
}
