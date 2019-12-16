import React, { useEffect } from "react";
import { Form, InputNumber } from "antd";

const TotalTrips = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_ntrips: value.tnkr_ntrips
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 9) {
      callback(
        `${t("placeholder.maxCharacters")}: 9 ─ ${t(
          "descriptions.maxCharacters"
        )}`
      );
    }
    callback();
  };

  return (
    <Form.Item label={t("fields.totalTrips")}>
      {getFieldDecorator("tnkr_ntrips", {
        rules: [{ required: false, validator: validate }]
      })(<InputNumber />)}
    </Form.Item>
  );
};

export default TotalTrips;
