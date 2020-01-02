import React from 'react';
import { Card } from 'antd';

import './equipment.css';

const Equipment = ({ value }) => {
  return (
    <Card style={{ marginTop: 5 }} size="small" loading={!value}>
      <div className="equipment-icon">
        <img src={`/images/${value ? value.toLowerCase() : ''}.png`} alt="equipment" />
      </div>
    </Card>
  );
};

export default Equipment;
