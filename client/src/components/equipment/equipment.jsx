import React from 'react';
import { Card } from 'antd';

import { Rail, Flat, Prime, Rigid, Ship, Trailer, Default } from '../../assets/equipment';

import './equipment.css';

const path = {
  E: Rail,
  F: Flat,
  P: Prime,
  R: Rigid,
  S: Ship,
  T: Trailer,
  X: Default
};

const Equipment = ({ value }) => {
  return (
    <Card style={{ marginTop: 5 }} size="small" loading={!value}>
      <div className="equipment-icon">
        <img src={path[value]} alt="equipment" />
      </div>
    </Card>
  );
};

export default Equipment;
