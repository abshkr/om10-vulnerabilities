import React, { useState, useEffect } from "react";

import { tankerList } from "../../../../api";
import { Form, Select } from "antd";
import axios from "axios";

const EquipmentType = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_etp: value.tnkr_etp
      });
    }

    const getContext = () => {
      axios.all([tankerList.equipmentTypes()]).then(
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
    <Form.Item label={t("fields.equipmentType")}>
      {getFieldDecorator("tnkr_etp", {
        rules: [{ required: true }]
      })(
        <Select loading={isLoading} disabled={!!value}>
          {options.map((item, index) => (
            <Select.Option key={index} value={item.etyp_id}>
              {item.etyp_title}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default EquipmentType;
