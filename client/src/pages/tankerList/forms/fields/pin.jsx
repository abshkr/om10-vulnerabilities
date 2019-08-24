import React, { useEffect } from "react";
import { Form, InputNumber } from "antd";

const Pin = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_pin: value.tnkr_pin
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.pin")}>
      {getFieldDecorator("tnkr_pin", {
        rules: [{ required: false }]
      })(<InputNumber />)}
    </Form.Item>
  );
};

export default Pin;
