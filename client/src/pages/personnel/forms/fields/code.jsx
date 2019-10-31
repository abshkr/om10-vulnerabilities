import React, { useEffect } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

const Code = ({ form, value, t, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        per_code: value.per_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data, ["per_code", input]);

    if (input === "" || !input) {
      callback(`${t("validate.set")} ─ ${t("fields.code")}`);
    }

    if (input && !!match && !value) {
      callback(t("descriptions.alreadyExists"));
    }

    if (input && input.length > 12) {
      callback(`${t("placeholder.maxCharacters")}: 12 ─ ${t("descriptions.maxCharacters")}`);
    }
    callback();
  };

  return (
    <Form.Item label={t("fields.code")}>
      {getFieldDecorator("per_code", {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value} />)}
    </Form.Item>
  );
};

export default Code;
