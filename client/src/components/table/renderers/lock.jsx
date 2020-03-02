import React, { Component } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

export default class LockRenderer extends Component {
  render() {
    const { value } = this.props;
    return (
      <div className="cell-icon">
        {value ? (
          <LockOutlined style={{ fontSize: 18, color: value ? '#DAA520' : '#c0c0c0' }} />
        ) : (
          <UnlockOutlined style={{ fontSize: 18, color: value ? '#DAA520' : '#c0c0c0' }} />
        )}
      </div>
    );
  }
}
