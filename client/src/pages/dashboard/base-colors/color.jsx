import React, { useEffect, useState } from 'react';
import { Button, Form, Tooltip } from 'antd';
import { CompactPicker } from 'react-color';
import { useTranslation } from 'react-i18next';

import { getRealColor } from 'utils';
import api, { BASE_PRODUCTS } from 'api';

const BaseProductColor = ({ value }) => {
  const [visible, setVisible] = useState(false);
  // const [color, setColor] = useState('#ffffff');
  const [color, setColor] = useState('');

  const { t } = useTranslation();

  const updateBaseColor = async (code, color) => {
    const values = {
      base_code: code,
      base_color: color,
    };

    const results = await api.post(BASE_PRODUCTS.UPDATE_COLOR, values);
    console.log('................updateBaseColor', results);

    return results?.data;
  };

  const handleColorChange = async (colorValue) => {
    setVisible(false);

    setColor(colorValue?.hex);
    console.log('...............handleColorChange', colorValue, colorValue?.hex);
    // update the base product color in database
    await updateBaseColor(value?.base_code, colorValue?.hex);
  };

  const handleVisiblity = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (value) {
      const color = value.base_color; // === '' ? '#ffffff' : value.base_color;

      setColor(color);
    }
  }, [value]);

  return (
    <div>
      <Tooltip
        placement="top"
        title={`${!color ? t('fields.baseColorCurrentBlank') : t('fields.baseColorCurrentSet')} ${color} (${
          !visible ? t('prompts.clickColorButtonToOpen') : t('prompts.clickColorButtonToClose')
        })`}
      >
        <Button color={color} onClick={handleVisiblity} style={{ background: getRealColor(color) }} block>
          {!color ? t('fields.baseColorCurrentBlank') : t('fields.baseColorCurrentSet')} {color}
        </Button>
      </Tooltip>

      <div
        style={{
          position: 'relative',
          zIndex: '2',
        }}
      >
        {visible && <CompactPicker color={getRealColor(color)} onChangeComplete={handleColorChange} />}
      </div>
    </div>
  );
};

export default BaseProductColor;
