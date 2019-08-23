import React, { Component } from "react";

import { Form, Button, Tabs, notification, Modal } from "antd";
import { logicalPrinters } from "../../../api";
import { Depot, Owner } from "./fields";
import axios from "axios";

class FormModal extends Component {
  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([logicalPrinters.createLogicalPrinters(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Created.",
                description: `You have created the Printer ${
                  values.prt_printer
                }`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: "Failed to create the Printer."
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
          .all([logicalPrinters.updateLogicalPrinters(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Updated.",
                description: `You have updated the Printer ${
                  values.prt_printer
                }`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: "Failed to update the Printer."
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
      .all([logicalPrinters.deleteLogicalPrinters(value)])
      .then(
        axios.spread(response => {
          this.props.refresh();
          Modal.destroyAll();
          notification.success({
            message: "Successfully Deleted.",
            description: `You have deleted the Tank ${value.prt_printer}`
          });
        })
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: "Failed to delete the Tank."
        });
      });
  };

  showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this Printer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: this.handleDelete
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Printer?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleUpdate
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Printer?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleCreate
    });
  };

  componentDidMount() {
    const { form, value } = this.props;

    if (!!value) {
      form.setFieldsValue(value);
    }
  }

  render() {
    const { form, value, t } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const TabPane = Tabs.TabPane;

    return (
      <div>
        <Form>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={t("tabColumns.general")}
              key="1"
              style={{ height: "50vh" }}
            >
              <Depot
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
              <Owner
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
            </TabPane>
            <TabPane
              tab={t("tabColumns.tanker")}
              key="2"
              style={{ height: "50vh" }}
            />
            <TabPane
              tab={t("tabColumns.compartments")}
              key="3"
              style={{ height: "50vh" }}
            />
            <TabPane
              tab={t("tabColumns.expiryDates")}
              key="4"
              style={{ height: "50vh" }}
            />
            <TabPane
              tab={t("tabColumns.bulkEdit")}
              key="5"
              style={{ height: "50vh" }}
            />
          </Tabs>
        </Form>

        <Button
          shape="round"
          icon="close"
          style={{ float: "right" }}
          onClick={() => Modal.destroyAll()}
        >
          {t("operations.cancel")}
        </Button>

        <Button
          shape="round"
          type="primary"
          icon={!!value ? "edit" : "plus"}
          style={{ float: "right", marginRight: 5 }}
          onClick={!!value ? this.showUpdateConfirm : this.showCreateConfirm}
        >
          {!!value ? t("operations.update") : t("operations.create")}
        </Button>

        {!!value && (
          <Button
            shape="round"
            type="danger"
            icon="delete"
            style={{ float: "right", marginRight: 5 }}
            onClick={this.showDeleteConfirm}
          >
            {t("operations.delete")}
          </Button>
        )}
      </div>
    );
  }
}

const Forms = Form.create()(FormModal);

export default Forms;
