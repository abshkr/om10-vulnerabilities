import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';

const DensityRange = ({ form, value }) => {
  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_dens_lo: value.base_dens_lo,
        base_dens_hi: value.base_dens_hi
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="base_dens_lo"
      label={`Density Range ${value ? `(${value.base_class_dens_lo} - ${value.base_class_dens_hi})` : ''}`}
    >
      <strong>Low:</strong>

      <InputNumber
        min={0}
        max={value?.base_class_dens_lo}
        style={{ width: 150, marginLeft: 5, marginRight: 5 }}
      />

      <strong>High:</strong>

      <InputNumber
        min={value?.base_class_dens_lo}
        max={value?.base_class_dens_hi}
        style={{ width: 150, marginLeft: 5 }}
      />
    </Form.Item>
  );
};

export default DensityRange;
