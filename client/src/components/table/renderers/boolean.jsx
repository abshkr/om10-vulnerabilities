import React, { Component } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default class BooleanRenderer extends Component {
  render() {
    const { value } = this.props;

    return (
      <div className="cell-icon">
        {value ? (
          <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />
        ) : (
          <CloseCircleOutlined style={{ fontSize: 18, color: '#ec6e68' }} />
        )}
      </div>
    );
  }
}
