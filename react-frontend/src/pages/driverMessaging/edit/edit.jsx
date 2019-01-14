import React, { Component } from "react";
import { Modal, Form, Input, Select, Icon } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const status = {
  New: "thunderbolt",
  Acknowledged: "check",
  Deleted: "warning"
};

const EditForm = Form.create()(
  class extends React.Component {
    componentDidMount() {
      const { payload, form } = this.props;
      form.setFieldsValue({
        date: payload.date,
        status: payload.status,
        recipient: payload.location,
        identifier: payload.recipient,
        message: payload.message
      });
    }

    render() {
      const { visible, onCancel, onCreate, form, payload } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Edit This Message"
          okText="Send Message"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Timestamp">
              {getFieldDecorator("date", {})(
                <Input
                  prefix={<Icon type="hourglass" style={{ color: "rgba(0,0,0,.25)" }} />}
                  disabled={true}
                  type="textarea"
                />
              )}
            </FormItem>

            <FormItem label="Status">
              {getFieldDecorator("status", {})(
                <Input
                  prefix={<Icon type={status[payload.status]} style={{ color: "rgba(0,0,0,.25)" }} />}
                  disabled={true}
                  type="textarea"
                />
              )}
            </FormItem>

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
              })(
                <Input
                  prefix={<Icon type="barcode" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="textarea"
                />
              )}
            </FormItem>
            <FormItem label="Message">
              {getFieldDecorator("message", {
                rules: [{ required: true, message: "Please input the recipient." }]
              })(<TextArea placeholder="Please Enter your Message" autosize={{ minRows: 2 }} />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default class Edit extends Component {
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
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { status, update } = this.props;
    return (
      <div>
        {status.show && (
          <EditForm
            wrappedComponentRef={this.saveFormRef}
            visible={status.show}
            onCancel={() => update(false)}
            onCreate={this.handleCreate}
            payload={status.payload}
          />
        )}
      </div>
    );
  }
}
