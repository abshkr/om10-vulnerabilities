import React, { useEffect } from "react";
import { Form, InputNumber } from "antd";

const LastTrip = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_last_trip: value.tnkr_last_trip
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.lastTrip")}>
      {getFieldDecorator("tnkr_last_trip", {
        rules: [{ required: false }]
      })(<InputNumber disabled />)}
    </Form.Item>
  );
};

export default LastTrip;
