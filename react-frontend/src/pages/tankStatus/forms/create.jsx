import React from "react";
import axios from "axios";
import { Modal, Form, Button } from "antd";

const Create = Form.create()(
  class extends React.Component {
    post = values => {
      axios({
        method: "post",
        url: "https://10.1.10.66/api/base_prod/create.php",
        data: values
      }).then(function(response) {
        console.log(response);
      });
    };

    createConfirm = values => {
      Modal.confirm({
        centered: true,
        title: "Confirm Creation",
        content: "Are you sure you want to Create this Base Product?",
        okText: "Create",
        cancelText: "Cancel",
        onOk: this.post(values),
        cancelButtonProps: {
          className: "primary"
        }
      });
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.createConfirm(values);
        }
      });
    };

    render() {
      const { visible, cancel, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Create"
          onCancel={cancel}
          onOk={this.handleCreate}
          width={800}
          destroyOnClose={true}
          bodyStyle={{
            overflowY: "scroll",
            height: 640,
            overflowX: "hidden"
          }}
          footer={[
            <Button key="cancel" onClick={cancel}>
              Cancel
            </Button>,
            <Button key="update" onClick={this.handleSubmit}>
              Create
            </Button>
          ]}
        >
          <Form />
        </Modal>
      );
    }
  }
);

export default Create;
