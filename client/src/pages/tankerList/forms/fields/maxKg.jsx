import React, { useEffect } from "react";
import { Form, InputNumber } from "antd";

const MaxKg = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_max_kg: value.tnkr_max_kg
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.maxKg")}>
      {getFieldDecorator("tnkr_pin", {
        rules: [{ required: false }]
      })(<InputNumber />)}
    </Form.Item>
  );
};

export default MaxKg;
