import React, { useState, useEffect } from "react";
import { tankerList } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const Carrier = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_carrier: value.tnkr_carrier
      });
    }

    const getContext = () => {
      axios.all([tankerList.carriers()]).then(
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
    <Form.Item label={t("fields.carrier")}>
      {getFieldDecorator("tnkr_carrier", {
        rules: [{ required: true }]
      })(
        <Select loading={isLoading}>
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

export default Carrier;
