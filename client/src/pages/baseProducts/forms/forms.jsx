import React, { Component } from "react";
import { Form, Button, Tabs, notification, Modal } from "antd";

import {
  AdaptiveArmPriority,
  AdaptiveFlowControl,
  BaseProductCode,
  BaseProductName,
  BaseProductClassifications,
  BaseProductGroup,
  BaseProductColor,
  RefTempSpec,
  DensityRangeLow,
  DensityRangeHigh,
  CorrectionMethod
} from "./fields";

import axios from "axios";

class BaseProductsForm extends Component {
  state = {
    color: "#fff"
  };

  changeColor = color => {
    this.setState({
      color
    });
  };

  resetColor = () => {
    this.setState({
      color: null
    });
  };

  handleCreate = () => {
    const { color } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!!color) {
          values["base_color"] = this.state.color;
        }
        console.log(values);
      } else {
        notification.error({
          message: "Validation Failed.",
          description: "Make sure all the fields meet the requirements."
        });
      }
    });
  };

  handleUpdate = () => {
    const { color } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!!color) {
          values["base_color"] = this.state.color;
        }
        console.log(values);
      } else {
        notification.error({
          message: "Validation Failed.",
          description: "Make sure all the fields meet the requirements."
        });
      }
    });
  };

  handleDelete = () => {};

  showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this Base Product?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: this.handleDelete
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Base Product?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleUpdate
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Base Product?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleCreate
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
            <TabPane tab="General" key="1" st>
              <BaseProductCode decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <BaseProductName decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <BaseProductClassifications decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <BaseProductGroup decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <BaseProductColor decorator={getFieldDecorator} value={value} color={this.state.color} setValue={setFieldsValue} change={this.changeColor} reset={this.resetColor} />
            </TabPane>
            <TabPane tab="Correction" key="2">
              <CorrectionMethod decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <RefTempSpec decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <DensityRangeLow decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <DensityRangeHigh decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>

            <TabPane tab="Adaptive Flow" key="3">
              <AdaptiveFlowControl decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <AdaptiveArmPriority decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
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

const Forms = Form.create()(BaseProductsForm);

export default Forms;
