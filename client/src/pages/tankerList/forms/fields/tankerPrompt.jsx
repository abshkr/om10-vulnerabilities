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
    <Form.Item label={t("fields.tankerPrompt")}>
      {getFieldDecorator("tnkr_own_txt", {
        rules: [{ required: false, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default TankerPrompt;
