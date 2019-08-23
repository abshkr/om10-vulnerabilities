import React, { useState, useEffect } from "react";

import { tankerList } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const Depot = ({ decorator, value }) => {
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <Form.Item label="Base Depot">
      {decorator("tnkr_base_site", {
        rules: [{ required: false }]
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
