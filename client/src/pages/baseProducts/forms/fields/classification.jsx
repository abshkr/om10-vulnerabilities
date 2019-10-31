import React, { useEffect, useState } from "react";

import axios from "axios";
import { Form, Select } from "antd";
import { baseProducts } from "../../../../api";

const Classification = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === "" || !input) {
      callback(`${t("validate.select")} ─ ${t("fields.classification")}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        base_cat: value.base_cat
      });
    }

    const getContext = () => {
      axios.all([baseProducts.readBaseProductClassification()]).then(
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
    <Form.Item label={t("fields.classification")}>
      {getFieldDecorator("base_cat", {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isLoading}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t("placeholder.selectClassification") : null}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.bclass_no}>
              {item.bclass_desc}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Classification;
