import React from "react";
import axios from "axios";
import { Modal, Form, Button } from "antd";

const Create = Form.create()(
  class extends React.Component {
    state = {
      color: "#fff"
    };

    changeColor = color => {
      this.setState({ color });
    };

    post = values => {
      axios({
        method: "post",
        url: "https://10.1.10.66/api/pages/base_prod/create.php",
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
      const { color } = this.state;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values["base_color"] = color;
          this.createConfirm(values);
        }
      });
    };

    render() {
      const { visible, cancel } = this.props;

      return (
        <Modal
          visible={visible}
          title="Create A Personnel"
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
            <Button shape="round" key="cancel" onClick={cancel}>
              Cancel
            </Button>,
            <Button shape="round" key="update" onClick={this.handleSubmit}>
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
