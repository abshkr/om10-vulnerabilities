import React, { useEffect } from 'react';
import { Form, Select } from 'antd';

const HotTempFlag = ({ form, value, config }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const flags = [
    {
      value: '0',
      name: 'Disabled'
    },
    {
      value: '1',
      name: 'Enabled'
    }
  ];

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_limit_preset_ht: value.base_limit_preset_ht
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label="Limit Preset Mass Quantity to Capacity">
      {getFieldDecorator('base_limit_preset_ht')(
        <Select disabled={!config?.features?.hotLitreCalculation}>
          {flags.map((item, index) => (
            <Select.Option key={index} value={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default HotTempFlag;
