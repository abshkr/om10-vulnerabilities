import React, { Component } from "react";

import axios from "axios";
import ExpiryDates from "./expiryDates";
import { personnel } from "../../../api";
import PasswordReset from "./passwordReset";
import { Form, Button, Tabs, Modal, notification } from "antd";
import { Employer, Code, Name, Department, Email, Role, TimeCode, DriverLicence, Status, Comment, Lock, SLP } from "./fields";

class PersonnelForm extends Component {
  handleUpdate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([personnel.updatePersonnel(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();

              Modal.destroyAll();
              notification.success({
                message: "Successfully Updated.",
                description: `You have updated the Personnel ${values.per_code}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to update the Personnel."
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

  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([personnel.createPersonnel(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();

              Modal.destroyAll();
              notification.success({
                message: "Successfully Created.",
                description: `You have create the Personnel ${values.per_code}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to create the Personnel."
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([personnel.deletePersonnel(values.per_code)])
          .then(
            axios.spread(response => {
              this.props.refresh();

              Modal.destroyAll();
              notification.success({
                message: "Successfully Deleted.",
                description: `You have deleted the Personnel ${values.per_code}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to delete the Personnel."
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

  showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this Personnel?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: this.handleDelete
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Personnel?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleUpdate
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to create this Personnel?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleCreate
    });
  };

  render() {
    const { form, value, data } = this.props;
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <Form style={{ height: "65vh" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1" style={{ height: "55vh", overflowY: "scroll", paddingRight: 20 }}>
              <Employer decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Code decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <Name decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <SLP decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Department decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Email decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Role decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <TimeCode decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <DriverLicence decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Status decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Comment decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>
            <TabPane tab="Expiry Dates" key="2" style={{ height: "55vh", overflowY: "scroll", paddingRight: 20 }}>
              <ExpiryDates decorator={getFieldDecorator} value={value} setValue={setFieldsValue} getValue={getFieldValue} form={form} />
            </TabPane>
            <TabPane tab="Area Access Control" key="3">
              <Lock decorator={getFieldDecorator} value={value} setValue={setFieldsValue} getValue={getFieldValue} />
            </TabPane>
            {!!value && (
              <TabPane tab="Reset Password" key="4">
                <PasswordReset value={value} />
              </TabPane>
            )}
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

const Forms = Form.create()(PersonnelForm);

export default Forms;
