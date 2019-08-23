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

  return (
    <Form.Item label={t("fields.totalTrips")}>
      {getFieldDecorator("tnkr_ntrips", {
        rules: [{ required: false }]
      })(<InputNumber />)}
    </Form.Item>
  );
};

export default TotalTrips;
