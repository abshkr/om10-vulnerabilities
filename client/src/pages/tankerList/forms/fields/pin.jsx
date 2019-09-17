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

  const validate = (rule, input, callback) => {
    if (input && input.length > 40) {
      callback(
        `${t("placeholder.maxCharacters")}: 40 ─ ${t(
          "descriptions.maxCharacters"
        )}`
      );
    }
    callback();
  };

  return (
    <Form.Item label={t("fields.pin")}>
      {getFieldDecorator("tnkr_pin", {
        rules: [{ required: false, validator: validate }]
      })(<InputNumber />)}
    </Form.Item>
  );
};

export default Pin;
