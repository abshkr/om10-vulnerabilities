import React, { Component } from 'react';
import { SyncOutlined } from '@ant-design/icons';

export default class ATGRenderer extends Component {
  render() {
    const { value } = this.props;

    return (
      <div className="cell-icon">
        <SyncOutlined spin={value} />
      </div>
    );
  }
}
