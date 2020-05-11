import React from 'react';

import { EquipmentImage } from './style';

const Equipment = ({ image, isLoading }) => {
  if (image) {
    return (
      <EquipmentImage>
        <img src={`/images/${image}.png`} alt="equipment" />
      </EquipmentImage>
    );
  }

  return null;
};

export default Equipment;
