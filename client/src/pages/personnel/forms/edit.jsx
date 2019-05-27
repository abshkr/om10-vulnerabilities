import React from "react";
import { Modal, Form, Button } from "antd";

class EditForm extends React.Component {
  state = {
    color: null
  };

  changeColor = color => {
    this.setState({ color });
  };

  resetColor = () => {
    this.setState({ color: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = values["base_color"] = this.state.color;
        console.log(values);
      }
    });
  };

  render() {
    const { visible, cancel } = this.props;

    return (
      <Modal
        visible={visible}
        title="Edit A Personnel"
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
            Edit
          </Button>
        ]}
      >
        <Form />
      </Modal>
    );
  }
}

const Edit = Form.create()(EditForm);
export default Edit;
