import React, { useState, useEffect } from "react";

import { tankerList } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const Destination = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_dest_depot: value.tnkr_dest_depot
      });
    }

    const getContext = () => {
      axios.all([tankerList.terminal()]).then(
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
    <Form.Item label={t("fields.destination")}>
      {getFieldDecorator("tnkr_dest_depot", {
        rules: [{ required: false }]
      })(
        <Select
          loading={isLoading}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t("placeholder.selectDestination") : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.term_code}>
              {item.term_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Destination;
