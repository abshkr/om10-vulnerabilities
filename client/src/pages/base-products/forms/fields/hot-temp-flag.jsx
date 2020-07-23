import React, { useEffect } from 'react';
import { Form, Select } from 'antd';

const HotTempFlag = ({ form, value }) => {
  const { setFieldsValue } = form;

  const flags = [
    {
      value: '0',
      name: 'Disabled',
    },
    {
      value: '1',
      name: 'Enabled',
    },
  ];

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_limit_preset_ht: value.base_limit_preset_ht,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="base_limit_preset_ht" label="Limit Preset Mass Quantity to Capacity">
      <Select
	    dropdownMatchSelectWidth={false}
      >
        {flags.map((item, index) => (
          <Select.Option key={index} value={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default HotTempFlag;
