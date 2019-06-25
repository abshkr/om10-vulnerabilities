import React from "react";
import { Modal, Form } from "antd";

const FormModal = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    submit = () => {
      const { form } = this.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.props.create(values);
        form.resetFields();
      });
    };

    render() {
      const { visible, onCancel, children, title } = this.props;
      return (
        <Modal visible={visible} title={title} okText="Create" onCancel={onCancel} onOk={this.submit}>
          <Form layout="vertical">{children}</Form>
        </Modal>
      );
    }
  }
);

export default FormModal;
