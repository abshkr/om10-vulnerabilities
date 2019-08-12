import React, { Component } from "react";
import { Form, Button, Tabs, notification, Modal } from "antd";
import axios from "axios";
import { AreaID, AreaName } from "./fields";
import { area } from "../../../api";

class AreaForm extends Component {
  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([area.createArea(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Created.",
                description: `You have created the area ${values.area_k}`
              });
            })
          )
          .catch(function (error) {
            notification.error({
              message: error.message,
              description: "Failed to create the area."
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
          .all([area.updateArea(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Updated.",
                description: `You have updated the area ${values.area_k}`
              });
            })
          )
          .catch(function (error) {
            notification.error({
              message: error.message,
              description: "Failed to update the area."
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
      .all([area.deleteArea(value)])
      .then(
        axios.spread(response => {
          this.props.refresh();
          Modal.destroyAll();
          notification.success({
            message: "Successfully Deleted.",
            description: `You have deleted the area ${value.area_k}`
          });
        })
      )
      .catch(function (error) {
        notification.error({
          message: error.message,
          description: "Failed to delete the area."
        });
      });
  };

  showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this area?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: this.handleDelete
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this area?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleUpdate
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to create this area?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleCreate
    });
  };

  render() {
    const { form, value, data } = this.props;
    // console.log(this.props);
    const { getFieldDecorator, setFieldsValue } = form;
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <Form style={{ height: 320 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1">
              <AreaID decorator={getFieldDecorator} value={value} editable={false} setValue={setFieldsValue} data={data} />
              <AreaName decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
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

const Forms = Form.create()(AreaForm);

export default Forms;
