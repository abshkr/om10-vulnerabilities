import React, { useState, useEffect } from "react";
import { personnel } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const TimeCode = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === "" || !input) {
      callback(`${t("validate.select")} ─ ${t("fields.timeCode")}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        pt_timecd: value.pt_timecd
      });
    }

    const getContext = () => {
      axios.all([personnel.readPersonnelTimeCodes()]).then(
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
    <Form.Item label={t("fields.timeCode")}>
      {getFieldDecorator("pt_timecd", {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t("placeholder.selectTimeCode") : null}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.tcd_title}>
              {item.tcd_title}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default TimeCode;
