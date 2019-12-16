import React, { Component } from 'react';
import { Icon } from 'antd';

export default class BooleanRenderer extends Component {
  render() {
    const { value } = this.props;
    return (
      <div className="cell-icon">
        <Icon
          style={{ fontSize: 18, color: value ? '#52c41a' : '#ec6e68' }}
          type={value ? 'check' : 'close'}
        />
      </div>
    );
  }
}
