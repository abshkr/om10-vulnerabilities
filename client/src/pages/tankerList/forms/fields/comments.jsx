import React, { useEffect } from "react";
import { Form, Input } from "antd";

const Comments = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        remarks: value.remarks
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.comments")}>
      {getFieldDecorator("remarks", {
        rules: [{ required: false }]
      })(<Input.TextArea />)}
    </Form.Item>
  );
};

export default Comments;
