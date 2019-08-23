import React, { useState, useEffect } from "react";

import { tankerList } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const Owner = ({ decorator, value, setValue }) => {
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSetValues = () => {
    if (!!value) {
      setValue({
        tnkr_owner: value.tnkr_owner
      });
    }
  };

  useEffect(() => {
    const getContext = () => {
      axios.all([tankerList.owners()]).then(
        axios.spread(options => {
          setOptions(options.data.records);
          setLoading(false);
        })
      );
    };

    handleSetValues();
    setLoading(true);
    getContext();
  }, []);

  return (
    <Form.Item label="Owner">
      {decorator("tnkr_owner", {
        rules: [{ required: false }]
      })(
        <Select loading={isLoading} disabled={!!value}>
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

export default Owner;
