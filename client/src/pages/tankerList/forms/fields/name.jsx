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
    <Form.Item label={t("fields.name")}>
      {getFieldDecorator("tnkr_name", {
        rules: [{ required: false, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default Name;
