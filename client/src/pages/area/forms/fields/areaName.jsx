import React, { useEffect } from "react";
import { Form, Input } from "antd";

const AreaName = ({ form, value, t, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        area_name: value.area_name
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === "" || !input) {
      callback(`${t("validate.set")} ─ ${t("fields.areaName")}`);
    }

    if (input && input.length > 40) {
      callback(`${t("placeholder.maxCharacters")}: 40 ─ ${t("descriptions.maxCharacters")}`);
    }

    callback();
  };

  return (
    <Form.Item label={t("fields.areaName")}>
      {getFieldDecorator("area_name", {
        rules: [{ required: true, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default AreaName;
