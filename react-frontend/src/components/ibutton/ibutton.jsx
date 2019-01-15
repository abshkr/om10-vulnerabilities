import React from "react";
import { Modal, Form, Input } from "antd";

const IButtonForm = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isValid: "warning"
      };
    }

    normalizeTagText = (value, prevValue = []) => {
      if (!!value) {
        const length = value.length;

        if (length === 0) {
          this.setState({ isValid: "error" });
        } else {
          if (length === 16) {
            const sliced = value.slice(2, 14);
            this.setState({ isValid: "success" });
            return sliced;
          } else {
            this.setState({ isValid: "validating" });
            return value;
          }
        }
      } else {
        this.setState({ isValid: "warning" });
      }
    };

    render() {
      const { isValid } = this.state;
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="Scan I-Button" okText="Ok" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
            <Form.Item label="Tag Text" validateStatus={isValid} hasFeedback>
              {getFieldDecorator(
                "tag_text",
                {
                  normalize: this.normalizeTagText
                },
                {
                  rules: [
                    {
                      required: true,
                      message: "Please input the Tag Text"
                    }
                  ]
                }
              )(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default class IButton extends React.Component {
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.props.submit(values.tag_text);
      form.resetFields();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { visible, close } = this.props;
    return (
      <div>
        <IButtonForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={close}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
