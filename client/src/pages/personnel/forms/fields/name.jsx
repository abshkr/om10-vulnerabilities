import React, { useEffect } from "react";
import { Form, Input } from "antd";

const Name = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        per_name: value.per_name
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === "" || !input) {
      callback(`${t("validate.set")} ─ ${t("fields.name")}`);
    }

    if (input && input.length > 100) {
      callback(`${t("placeholder.maxCharacters")}: 100 ─ ${t("descriptions.maxCharacters")}`);
    }
    callback();
  };

  return (
    <Form.Item label={t("fields.name")}>
      {getFieldDecorator("per_name", {
        rules: [{ required: true, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default Name;
