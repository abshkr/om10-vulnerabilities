import React, { useEffect } from 'react';
import { Form } from 'antd';
import { SliderPicker } from 'react-color';

const BaseProductColor = ({ form, value }) => {
  const { setFieldsValue, getFieldValue } = form;

  const color = getFieldValue('base_color');

  const handleColorChange = value => {
    setFieldsValue({
      base_color: value?.hex
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_color: value.base_color
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="base_color" label="Base Product Color">
      <SliderPicker color={color} onChangeComplete={handleColorChange} />
    </Form.Item>
  );
};

export default BaseProductColor;
