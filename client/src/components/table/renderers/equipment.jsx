import React, { Component } from 'react';

import { Equipment } from '../..';

export default class EquipmentRenderer extends Component {
  render() {
    const { value } = this.props;

    const payload = value.split(',');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start !important',
        }}
      >
        {payload.map((item) => (
          <div
            style={{
              height: 50,
              width: '100%',
            }}
          >
            <Equipment
              image={item.toLowerCase()}
              style={{ height: '100%', objectFit: 'contain', objectPosition: '0 0' }}
            />
          </div>
        ))}
      </div>
    );
  }
}
