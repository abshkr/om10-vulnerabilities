import React, { useEffect } from 'react';
import { Form } from 'antd';
import { SliderPicker } from 'react-color';

const BaseProductColor = ({ form, value }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  getFieldDecorator('base_color');

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
  }, [value, setFieldsValue, getFieldDecorator]);

  return (
    <Form.Item label="Base Product Color">
      <SliderPicker color={color} onChangeComplete={handleColorChange} />
    </Form.Item>
  );
};

export default BaseProductColor;
