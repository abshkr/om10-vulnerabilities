import React, { Component } from "react";
import { Form, Button, Tabs, notification } from "antd";
import { tanks } from "../../../api";
import axios from "axios";
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
  state = {
    base: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleCreate = values => {
    axios
      .all([tanks.createTank(values)])
      .then(
        axios.spread(response => {
          this.props.refresh();
        })
      )
      .catch(function(error) {
        notification.error({
          message: error.message,
          description: "Failed to create the Tank."
        });
      });
  };

  handleUpdate = values => {
    axios
      .all([tanks.updateTank(values)])
      .then(
        axios.spread(response => {
          this.props.refresh();
        })
      )
      .catch(function(error) {
        notification.error({
          message: error.message,
          description: "Failed to update the Tank."
        });
      });
  };

  handleDelete = value => {
    axios
      .all([tanks.deleteTank(value)])
      .then(
        axios.spread(response => {
          this.props.refresh();
        })
      )
      .catch(function(error) {
        notification.error({
          message: error.message,
          description: "Failed to delete the Tank."
        });
      });
  };

  render() {
    const { form, value, baseProducts } = this.props;
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
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
              <Density
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                baseProducts={baseProducts}
                selectedBase={getFieldValue("tank_base")}
              />
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
          {!!value ? "Update" : "Create"}
        </Button>

        {!!value && (
          <Button type="danger" style={{ float: "right", marginRight: 5 }} onClick={this.handleSubmit}>
            Delete
          </Button>
        )}
      </div>
    );
  }
}

const Forms = Form.create()(TankConfigurationForm);

export default Forms;
