import React, { useEffect } from "react";
import { Form, Input } from "antd";

const Code = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_code: value.tnkr_code
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.code")}>
      {getFieldDecorator("tnkr_code", {
        rules: [{ required: true }]
      })(<Input disabled={!!value} />)}
    </Form.Item>
  );
};

export default Code;
