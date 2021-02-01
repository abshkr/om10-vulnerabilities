import React, { Component } from 'react';
import { Progress } from 'antd';

export default class ProgressRenderer extends Component {
  render() {
    const { value } = this.props;

    return (
      <div style={{ width: 230, paddingRight: 10 }}>
        <Progress 
          percent={value} 
          size="small" 
          status={value < 100 ? 'active' : 'success'} 
          strokeColor={ value > 120 ? "red" : null}
        />
      </div>
    );
  }
}
