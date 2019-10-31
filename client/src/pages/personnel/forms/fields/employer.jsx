import React, { useState, useEffect } from "react";
import { personnel } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const Employer = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === "" || !input) {
      callback(`${t("validate.select")} ─ ${t("fields.employer")}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        per_cmpy: value.per_cmpy
      });
    }

    const getContext = () => {
      axios.all([personnel.readPersonnelEmployers()]).then(
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
    <Form.Item label={t("fields.employer")}>
      {getFieldDecorator("per_cmpy", {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t("placeholder.selectEmployer") : null}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Employer;
