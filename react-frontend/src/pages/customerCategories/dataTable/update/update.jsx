import React, { Component } from "react";
import { Drawer, Form, Button, Input, notification } from "antd";

class DrawerForm extends Component {
  handleUpdate = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        throw err;
      }
      notification.success({
        message: "Successfully Created.",
        description: "The Customer Category has been successfully created."
      });
      this.props.onClose();
    });
  };

  componentDidMount() {
    const { selected, form } = this.props;
    form.setFieldsValue({
      code: !!selected ? selected.category_code : "",
      name: !!selected ? selected.category_name : ""
    });
  }

  componentDidUpdate(prevProps) {
    const { selected, form } = this.props;
    if (selected !== prevProps.selected) {
      form.setFieldsValue({
        code: !!selected ? selected.category_code : "",
        name: !!selected ? selected.category_name : ""
      });
    }
  }

  render() {
    const { form, onClose, visible, selected } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Drawer
          title={`Updating ${selected.category_code}`}
          width={720}
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Form.Item label="Category Code">
              {getFieldDecorator("code", {
                rules: [{ required: true, message: "Please enter your Category Code" }]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Category Name">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Please enter your Category Name" }]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Customers/Category">
              {getFieldDecorator("customers", {
                rules: [{ required: true, message: "Please select the Customer Category" }]
              })(<Input />)}
            </Form.Item>
          </Form>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e8e8e8",
              padding: "10px 16px",
              textAlign: "right",
              left: 0,
              background: "#fff",
              borderRadius: "0 0 4px 4px"
            }}
          >
            <Button
              style={{
                marginRight: 8
              }}
              onClick={this.handleUpdate}
              type="primary"
            >
              Update
            </Button>

            <Button
              style={{
                marginRight: 8
              }}
              onClick={onClose}
              type="primary"
            >
              Delete
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const Update = Form.create()(DrawerForm);

export default Update;
