import React, { useEffect } from "react";
import { Form, Input } from "antd";

const Name = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_name: value.tnkr_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.name")}>
      {getFieldDecorator("tnkr_name", {
        rules: [{ required: false }]
      })(<Input />)}
    </Form.Item>
  );
};

export default Name;
