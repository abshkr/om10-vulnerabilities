import React, { useEffect } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

const Name = ({ form, value, t, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        base_name: value.base_name
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === "" || !input) {
      callback(`${t("validate.set")} ─ ${t("fields.name")}`);
    }

    if (input && input.length > 40) {
      callback(`${t("placeholder.maxCharacters")}: 40 ─ ${t("descriptions.maxCharacters")}`);
    }
    callback();
  };

  return (
    <Form.Item label={t("fields.name")}>
      {getFieldDecorator("base_name", {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value} />)}
    </Form.Item>
  );
};

export default Name;
