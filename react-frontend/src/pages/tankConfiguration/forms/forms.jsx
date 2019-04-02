import React, { Component } from "react";
import { Form, Button, Tabs } from "antd";

import Terminal from "./fields/terminal";
import TankCode from "./fields/tankCode";
import Product from "./fields/product";
import TankName from "./fields/tankName";
import Density from "./fields/density";

import DailyVariancePercent from "./fields/dailyVariancePercent";
import DailyVarianceVol from "./fields/dailyVarianceVol";
import MonthlyVariancePercent from "./fields/monthlyVariancePercent";
import MonthlyVarianceVol from "./fields/montlyVarianceVol";

import ExcludeFromPID from "./fields/excludeFromPID";
import ExcludeFromPOS from "./fields/excludeFromPOS";
import ExcludeFromSMG from "./fields/excludeFromSMG";
import ExcludeFromStockReports from "./fields/excludeFromStockReports";

class TankConfigurationForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { form, value } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <Form style={{ height: 640 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1">
              <Terminal
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                disabled={!!value ? true : false}
              />
              <TankCode
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                disabled={!!value ? true : false}
              />
              <Product decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <TankName decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Density decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>

            <TabPane tab="Variance" key="2">
              <DailyVariancePercent decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <DailyVarianceVol decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <MonthlyVariancePercent decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <MonthlyVarianceVol decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>

            <TabPane tab="Flags" key="3">
              <ExcludeFromPID decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <ExcludeFromPOS decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <ExcludeFromSMG decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <ExcludeFromStockReports
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
            </TabPane>
          </Tabs>
        </Form>
        <Button type="primary" style={{ float: "right" }} onClick={this.handleSubmit}>
          {!!value ? "Edit" : "Create"}
        </Button>
      </div>
    );
  }
}

const Forms = Form.create()(TankConfigurationForm);

export default Forms;
