import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";

const Status = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options] = useState([
    {
      key: "0",
      value: "Inactive"
    },
    {
      key: "1",
      value: "Active"
    },
    {
      key: "2",
      value: "Locked"
    }
  ]);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        user_status_flag: value.user_status_flag
      });
    }
    setLoading(true);
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.status")}>
      {getFieldDecorator("user_status_flag", {
        rules: [{ required: false }]
      })(
        <Select
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t("placeholder.selectStatus") : null}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.key} disabled={item.key !== "0"}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Status;
