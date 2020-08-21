import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { CompactPicker } from 'react-color';
import { useTranslation } from 'react-i18next';

const BaseProductColor = ({ form, value }) => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState('#fff');

  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const handleColorChange = value => {
    setVisible(false);

    setFieldsValue({
      base_color: value?.hex
    });

    setColor(value?.hex);
  };

  const handleVisiblity = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (value) {
      const color = value.base_color; // === '' ? '#fff' : value.base_color;

      setFieldsValue({
        base_color: color
      });

      setColor(color);
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Form.Item name="base_color" label={t('fields.baseProdColor')}>
        <Button color={color} onClick={handleVisiblity} style={{ background: color }} block>
        {!color? t('fields.baseColorCurrentBlank') : t('fields.baseColorCurrentSet')} {color}
        </Button>
      </Form.Item>

      <div
        style={{
          position: 'relative',
          zIndex: '2'
        }}
      >
        {visible && <CompactPicker color={color} onChangeComplete={handleColorChange} />}
      </div>
    </div>
  );
};

export default BaseProductColor;
