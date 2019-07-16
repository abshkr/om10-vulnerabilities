import React, { Component } from "react";

import _ from "lodash";
import axios from "axios";
import ExpiryDates from "./expiryDates";
import Compartments from "./compartments";
import { equipmentList } from "../../../api";
import { Form, Button, Tabs, Modal, notification } from "antd";
import { Owner, Code, Title, Id, EquipmentType, Area, LoadType, EmptyWeight, PullingLimit, Locks, Comments } from "./fields";

class PersonnelForm extends Component {
  handleUpdate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([equipmentList.updateEquipment(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Updated.",
                description: `You have updated the Equipment ${values.eqpt_id}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to updated the Equipment."
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
          .all([equipmentList.createEquipment(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: "Successfully Created.",
                description: `You have created the Equipment ${values.eqpt_id}`
              });
            })
          )
          .catch(function(error) {
            notification.error({
              message: error.message,
              description: "Failed to created the Equipment."
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
      title: "Are you sure you want to delete this Equipment?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true
    });
  };

  showConsolidateConfirm = () => {
    const { data } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const records = _.find(data, ["eqpt_title", values.eqpt_title]);
        if (records.length > 0) {
          Modal.confirm({
            title: `Expiry Date Adjustments.`,
            content: <div>{`We have found ${records.length} records with similar configurations. Do you want to apply the same expiry dates?`}</div>,
            okText: "Yes",
            okType: "primary",
            cancelText: "No",
            centered: true,
            onOk: this.handleCreate,
            onCancel: this.handleUpdate
          });
        } else {
          this.showUpdateConfirm();
        }
      }
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Equipment?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true,
      onOk: this.handleUpdate
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Equipment?",
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
        <Form style={{ height: 640 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1" style={{ height: 550, overflowY: "scroll", paddingRight: 20 }}>
              <Code decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <Id decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <Owner decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <Title decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <Area decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <LoadType decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <EmptyWeight decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <PullingLimit decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <Locks decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <Comments decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
            </TabPane>
            <TabPane tab="Expiry Dates" key="2" style={{ height: 550, overflowY: "scroll", paddingRight: 20 }}>
              <ExpiryDates decorator={getFieldDecorator} value={value} setValue={setFieldsValue} getValue={getFieldValue} form={form} />
            </TabPane>

            <TabPane tab="Compartments" key="3" forceRender={true}>
              <EquipmentType decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
              <Compartments
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                getValue={getFieldValue}
                form={form}
                data={data}
                equipment={getFieldValue("eqpt_etp")}
              />
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
          onClick={!!value ? this.showConsolidateConfirm : this.showCreateConfirm}
        >
          {!!value ? "Update" : "Create"}
        </Button>

        {!!value && (
          <Button shape="round" type="dashed" icon="unlock" style={{ float: "right", marginRight: 5 }}>
            Unlock All Compartments
          </Button>
        )}

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
