import React, { Component } from 'react';

export default class ImageRenderer extends Component {
  render() {
    const { value, assets_folder } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!!value && (
          <div
            style={{
              background: `url('api/assets/${assets_folder ? assets_folder : 'procducts'}/${value}') no-repeat center center/cover`,
              height: '1rem',
              width: '1rem',
              marginRight: '1rem',
            }}
          >
            {' '}
          </div>
        )}
        {/* <div>{value}</div> */}
      </div>
    );
  }
}
