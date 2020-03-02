import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export default class Loading extends Component {
  render() {
    return (
      <div className="ag-custom-loading-cell" style={{ paddingLeft: '10px', lineHeight: '25px' }}>
        <LoadingOutlined style={{ fontSize: 24, color: '#68a4ec' }} />
      </div>
    );
  }
}
