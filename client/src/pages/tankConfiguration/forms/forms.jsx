import React, { Component } from "react";
import { Form, Button, Tabs, notification, Modal } from "antd";
import { tanks } from "../../../api";
import axios from "axios";

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

  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([tanks.createTank(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Created.",
                description: `You have Created the Tank ${values.tank_code}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to create the Tank."
            });
          });
      } else {
        notification.error({
          message: "Validation Failed.",
          description: "Make sure all the fields meet the requirements."
        });
      }
    });
  };

  handleUpdate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([tanks.updateTank(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Updated.",
                description: `You have updated the Tank ${values.tank_code}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to update the Tank."
            });
          });
      } else {
        notification.error({
          message: "Validation Failed.",
          description: "Make sure all the fields meet the requirements."
        });
      }
    });
  };

  handleDelete = () => {
    const { value } = this.props;
    axios
      .all([tanks.deleteTank(value.tank_code)])
      .then(
        axios.spread(response => {
          this.props.refresh();
          Modal.destroyAll();
          notification.success({
            message: "Successfully Deleted.",
            description: `You have deleted the Tank ${value.tank_code}`
          });
        })
      )
      .catch(function(error) {
        notification.error({
          message: error.message,
          description: "Failed to delete the Tank."
        });
      });
  };

  showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this tank?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: this.handleDelete
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this tank?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleUpdate
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this tank?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleCreate
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
              <TankCode decorator={getFieldDecorator} value={value} setValue={setFieldsValue} disabled={!!value ? true : false} />
              <Product decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <TankName decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Density decorator={getFieldDecorator} value={value} setValue={setFieldsValue} baseProducts={baseProducts} selectedBase={getFieldValue("tank_base")} />
            </TabPane>

            <TabPane tab="Variance" key="2">
              <DailyVariancePercent decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <DailyVarianceVol decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <MonthlyVariancePercent decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <MonthlyVarianceVol decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>

            <TabPane tab="Flags" key="4">
              <ExcludeFromPID decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <ExcludeFromPOS decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <ExcludeFromSMG decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <ExcludeFromStockReports decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>
          </Tabs>
        </Form>

        <Button icon="close" style={{ float: "right" }} onClick={() => Modal.destroyAll()}>
          Cancel
        </Button>

        <Button type="primary" icon={!!value ? "edit" : "plus"} style={{ float: "right", marginRight: 5 }} onClick={!!value ? this.showUpdateConfirm : this.showCreateConfirm}>
          {!!value ? "Update" : "Create"}
        </Button>

        {!!value && (
          <Button type="danger" icon="delete" style={{ float: "right", marginRight: 5 }} onClick={this.showDeleteConfirm}>
            Delete
          </Button>
        )}
      </div>
    );
  }
}

const Forms = Form.create()(TankConfigurationForm);

export default Forms;
