import React, { Component } from "react";

import axios from "axios";
import { Form, Button, Tabs, notification, Modal } from "antd";
import { reportProfile } from "../../../api";
import {
  Source,
  Name,
  Description,
  Type,
  CloseOutReport,
  OnDemandReport,
  CloseOutBy
} from "./fields";

class ReportProfileForm extends Component {
  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([reportProfile.createProfile(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Created.",
                description: `You have created the Report Profile ${values.base_code}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to create the Report Profile."
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
          .all([reportProfile.updateProfile(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Updated.",
                description: `You have updated the Report Profile ${values.base_code}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to update the Report Profile."
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
      .all([reportProfile.deleteProfile(value)])
      .then(
        axios.spread(response => {
          this.props.refresh();
          Modal.destroyAll();
          notification.success({
            message: "Successfully Deleted.",
            description: `You have deleted the Tank ${value.base_code}`
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
      title: "Are you sure you want to delete this Report Configuration?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: this.handleDelete
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Report Configuration?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleUpdate
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Report Configuration?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleCreate
    });
  };

  render() {
    const { form, value } = this.props;
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

    const TabPane = Tabs.TabPane;

    return (
      <div>
        <Form style={{ height: "65vh" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1">
              <Source
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                getValue={getFieldValue}
              />

              <Name
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                getValue={getFieldValue}
              />

              <Type
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                getValue={getFieldValue}
              />

              <Description
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                getValue={getFieldValue}
              />

              <CloseOutBy
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                getValue={getFieldValue}
              />

              <CloseOutReport
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                getValue={getFieldValue}
              />

              <OnDemandReport
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                getValue={getFieldValue}
              />
            </TabPane>
          </Tabs>
        </Form>

        <Button
          shape="round"
          icon="close"
          style={{ float: "right" }}
          onClick={() => Modal.destroyAll()}
        >
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
          <Button
            shape="round"
            type="danger"
            icon="delete"
            style={{ float: "right", marginRight: 5 }}
            onClick={this.showDeleteConfirm}
          >
            Delete
          </Button>
        )}
      </div>
    );
  }
}

const Forms = Form.create()(ReportProfileForm);

export default Forms;
