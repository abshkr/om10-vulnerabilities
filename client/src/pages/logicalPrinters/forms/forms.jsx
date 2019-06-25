import React, { Component } from "react";
import { Form, Button, Tabs, notification, Modal } from "antd";
import axios from "axios";
import { Company, Printer, Usage } from "./fields";
import { logicalPrinters } from "../../../api";

class LogicalPrinterForm extends Component {
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
                description: `You have created the Printer ${values.prt_printer}`
              });
            })
          )
          .catch(function(error) {
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
                description: `You have updated the Printer ${values.prt_printer}`
              });
            })
          )
          .catch(function(error) {
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
      .catch(function(error) {
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

  render() {
    const { form, value } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <Form style={{ height: 640 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1">
              <Company decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Usage decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Printer decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>
          </Tabs>
        </Form>

        <Button shape="round" icon="close" style={{ float: "right" }} onClick={() => Modal.destroyAll()}>
          Cancel
        </Button>

        <Button
          shape="round"
          type="primary"
          icon={!!value ? "edit" : "plus"}
          style={{ float: "right", marginRight: 5 }}
          onClick={!!value ? this.showUpdateConfirm : this.showCreateConfirm}
        >
          {!!value ? "Update" : "Create"}
        </Button>

        {!!value && (
          <Button shape="round" type="danger" icon="delete" style={{ float: "right", marginRight: 5 }} onClick={this.showDeleteConfirm}>
            Delete
          </Button>
        )}
      </div>
    );
  }
}

const Forms = Form.create()(LogicalPrinterForm);

export default Forms;
