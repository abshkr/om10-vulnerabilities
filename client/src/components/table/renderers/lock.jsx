import React, { Component } from 'react';
import { Icon } from 'antd';

export default class LockRenderer extends Component {
  render() {
    const { value } = this.props;
    return (
      <div className="cell-icon">
        <Icon
          style={{ fontSize: 18, color: value ? '#DAA520' : '#c0c0c0' }}
          type={value ? 'lock' : 'unlock'}
        ></Icon>
      </div>
    );
  }
}
