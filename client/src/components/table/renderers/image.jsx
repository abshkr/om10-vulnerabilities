import React, { Component } from 'react';
import { Tooltip } from 'antd';

export default class ImageRenderer extends Component {
  render() {
    const { value, assets_folder } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!!value && (
          <Tooltip placement="right" title={value}>
            <div
              style={{
                background: `url('api/assets/${
                  assets_folder ? assets_folder : 'products'
                }/${value}') no-repeat center center/cover`,
                height: '1rem',
                width: '1rem',
                marginRight: '1rem',
              }}
            >
              {' '}
            </div>
          </Tooltip>
        )}
        {/* <div>{value}</div> */}
      </div>
    );
  }
}
