import React, { useState, useEffect } from "react";

import { tankerList } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const Depot = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_base_site: value.tnkr_base_site
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
    <Form.Item label={t("fields.baseDepot")}>
      {getFieldDecorator("tnkr_base_site", {
        rules: [{ required: true }]
      })(
        <Select loading={isLoading} disabled={!!value}>
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

export default Depot;
