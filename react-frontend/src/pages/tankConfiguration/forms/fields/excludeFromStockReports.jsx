import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromStockReports extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        excl_from_stock_rep: value.excl_from_stock_rep
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item>
        {decorator("excl_from_stock_rep", {
          initialValue: false
        })(<Checkbox>Exclude from Stock Reports</Checkbox>)}
      </Form.Item>
    );
  }
}
