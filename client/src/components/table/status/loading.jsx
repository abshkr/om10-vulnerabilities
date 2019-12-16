import React, { Component } from 'react';
import { Icon } from 'antd';

export default class Loading extends Component {
  render() {
    return (
      <div className="ag-custom-loading-cell" style={{ paddingLeft: '10px', lineHeight: '25px' }}>
        <Icon type="loading" style={{ fontSize: 24, color: '#68a4ec' }} spin />
      </div>
    );
  }
}
