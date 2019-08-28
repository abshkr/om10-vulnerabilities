import React, { useEffect } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

const Code = ({ form, value, t, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_code: value.tnkr_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data, ["tnkr_code", input]);

    if (input && !!match && !value) {
      callback(t("descriptions.alreadyExists"));
    }

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
    <Form.Item label={t("fields.code")}>
      {getFieldDecorator("tnkr_code", {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value} />)}
    </Form.Item>
  );
};

export default Code;
