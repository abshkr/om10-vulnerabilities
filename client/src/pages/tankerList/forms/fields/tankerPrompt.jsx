import React, { useEffect } from "react";
import { Form, Input } from "antd";

const TankerPrompt = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_own_txt: value.tnkr_own_txt
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.tankerPrompt")}>
      {getFieldDecorator("tnkr_own_txt", {
        rules: [{ required: false }]
      })(<Input />)}
    </Form.Item>
  );
};

export default TankerPrompt;
