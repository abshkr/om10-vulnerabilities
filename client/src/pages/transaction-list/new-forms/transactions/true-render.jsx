import React, { Component } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default class TrueRenderer extends Component {
  render() {
    const { value } = this.props;
    console.log(this.props);

    return (
      <div className="cell-icon">
        {value && <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />}
      </div>
    );
  }
}
