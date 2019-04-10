import React, { Component } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";
import { find } from "lodash";

const FormItem = Form.Item;

const CreateForm = Form.create()(
  class extends React.Component {
    checkValidity = (rule, value, callback) => {
      axios.get(`https://10.1.10.66/api/pages/cust_cat/read.php`).then(res => {
        const data = res.data.records;
        console.log(data);
        find(data);
      });

      // else {
      //   callback();
      // }
    };

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create new Customer Category"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Category Code">
              {getFieldDecorator("code", {
                rules: [{ required: true, message: "Please input the category code." }]
              })(<Input type="textarea" />)}
            </FormItem>
            <FormItem label="Category Name">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Please input the category name." }]
              })(<Input type="textarea" />)}
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

      axios
        .get(
          `https://10.1.10.66/api/pages/cust_cat/create.php?category_code=${values.code}&category_name=${
            values.name
          }`
        )
        .then(
          res => {
            this.props.update();
            notification.success({
              message: "Successfully Created.",
              description: "The Customer Category has been successfully created."
            });
          },
          error => {
            notification.error({
              message: "Creation Failed.",
              description: "The Customer Category has creation failed."
            });
          }
        );
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
          Add New Category
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
