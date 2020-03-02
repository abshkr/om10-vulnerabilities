import React, { Component } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default class BooleanRenderer extends Component {
  render() {
    const { value } = this.props;
    return (
      <div className="cell-icon">
        {value ? (
          <CheckOutlined style={{ fontSize: 18, color: value ? '#52c41a' : '#ec6e68' }} />
        ) : (
          <CloseOutlined style={{ fontSize: 18, color: value ? '#52c41a' : '#ec6e68' }} />
        )}
      </div>
    );
  }
}
