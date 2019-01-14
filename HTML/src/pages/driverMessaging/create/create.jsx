import React, { Component } from "react";
import { Button, Modal, Form, Input, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const CreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="Create new message" okText="Send" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
            <FormItem label="Recipient">
              {getFieldDecorator("recipient", {
                rules: [{ required: true, message: "Please input the recipient." }]
              })(
                <Select placeholder="Choose your Recipient">
                  <Option value="driver">Driver</Option>
                  <Option value="tanker">Tanker</Option>
                  <Option value="equipment">Equipment</Option>
                  <Option value="bay">Bay</Option>
                  <Option value="trip">Trip</Option>
                  <Option value="order">Order</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="Identifier">
              {getFieldDecorator("identifier", {
                rules: [{ required: true, message: "Please input the recipient." }]
              })(<Input type="textarea" />)}
            </FormItem>
            <FormItem label="Message">
              {getFieldDecorator("message", {
                rules: [{ required: true, message: "Please input the recipient." }]
              })(<TextArea placeholder="Please Enter your Message" autosize />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default class Create extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    const form = this.formRef.props.form;
    this.setState({ visible: true });
    form.resetFields();
  };

  handleCancel = () => {
    const form = this.formRef.props.form;
    this.setState({ visible: false });
    form.resetFields();
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        throw err;
      }

      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 10, fontSize: 16 }}>
          Create
        </Button>

        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
