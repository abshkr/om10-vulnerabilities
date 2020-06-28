import React, { Component } from 'react';

export default class ImageRenderer extends Component {
  render() {
    const { value } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!!value && (
          <div
            style={{
              background: `url('api/assets/products/${value}') no-repeat center center/cover`,
              // background: `url('api/assets/products/BioDiesel 100.png') no-repeat center center/cover`,
              height: '1rem',
              width: '1rem',
              marginRight: '1rem',
            }}
          >
            {' '}
          </div>
        )}
        <div>{value}</div>
      </div>
    );
  }
}
