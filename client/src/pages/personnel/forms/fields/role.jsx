import React, { useState, useEffect } from "react";
import { personnel } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const Role = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === "" || !input) {
      callback(`${t("validate.select")} ─ ${t("fields.role")}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        per_auth: value.per_auth
      });
    }

    const getContext = () => {
      axios.all([personnel.readPersonnelRoles()]).then(
        axios.spread(options => {
          setOptions(options.data.records);
          setLoading(false);
        })
      );
    };

    setLoading(true);
    getContext();
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.role")}>
      {getFieldDecorator("per_auth", {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t("placeholder.selectRole") : null}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.role_id}>
              {item.role_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Role;
