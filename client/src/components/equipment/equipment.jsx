import React from 'react';
import { Card } from 'antd';
import { EquipmentImage } from './style';

const Equipment = ({ image, isLoading }) => {
  if (image) {
    return (
      <Card style={{ marginTop: 5 }} size="small" loading={isLoading}>
        <EquipmentImage>
          <img src={`/images/${image}.png`} alt="equipment" />
        </EquipmentImage>
      </Card>
    );
  }

  return null;
};

export default Equipment;
