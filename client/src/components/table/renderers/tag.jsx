import React, { Component } from 'react';
import { Tag } from 'antd';

export default class TagRenderer extends Component {
  render() {
    const { value, colDef } = this.props;

    return (
      <div>
        <Tag color={colDef?.color || value}>{value}</Tag>
      </div>
    );
  }
}
