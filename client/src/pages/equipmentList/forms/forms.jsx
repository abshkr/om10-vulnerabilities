import React, { Component } from "react";
import { Form, Button, Tabs, Modal } from "antd";
import { Owner, Code, Title, Id, EquipmentType, Area, LoadType, EmptyWeight, PullingLimit, Locks, Comments } from "./fields";
import ExpiryDates from "./expiryDates";
import Compartments from "./compartments";

class PersonnelForm extends Component {
  handleUpdate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
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
              <EquipmentType decorator={getFieldDecorator} value={value} setValue={setFieldsValue} data={data} />
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
            <TabPane tab="Compartments" key="3">
              <Compartments decorator={getFieldDecorator} value={value} setValue={setFieldsValue} getValue={getFieldValue} form={form} />
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

const Forms = Form.create()(PersonnelForm);

export default Forms;
