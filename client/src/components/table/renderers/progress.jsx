import React, { Component } from 'react';
import { Progress, Tag } from 'antd';

export default class ProgressRenderer extends Component {
  render() {
    const { value } = this.props;

    return (
      <div style={{ width: 230, paddingRight: 10 }}>
        <Progress
          percent={value}
          showInfo={false}
          size="small"
          // strokeColor={ value > 120 ? "red" : null}
          status={value < 100 ? 'active' : value > 120 ? 'exception' : 'success'}
          style={{ width: 160 }}
        />
        <Tag style={{ width: 66, textAlign: 'center', padding: 0 }}>{value + '%'} </Tag>
      </div>
    );
  }
}
