import React, { Component } from "react";
import { Form, Button, Tabs, Modal } from "antd";
import { Employer, Code, Name, Department, Email, Role, TimeCode, DriverLicence, Status, Comment, ExpiryDates } from "./fields";

class PersonnelForm extends Component {
  showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this Personnel?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Personnel?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to update this Personnel?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      centered: true
    });
  };

  render() {
    const { form, value } = this.props;
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <Form style={{ height: 640 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1" style={{ height: 550, overflowY: "scroll", paddingRight: 20 }}>
              <Employer decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Code decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Name decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Department decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Email decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Role decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <TimeCode decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <DriverLicence decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Status decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Comment decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>
            <TabPane tab="Expiry Dates" key="2" style={{ height: 550, overflowY: "scroll", paddingRight: 20 }}>
              <ExpiryDates decorator={getFieldDecorator} value={value} setValue={setFieldsValue} getValue={getFieldValue} form={form} />
            </TabPane>
            <TabPane tab="Area Access Control" key="3" />
            <TabPane tab="Reset Password" key="4" />
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
