import React, { Component } from 'react';
import { Badge } from 'antd';

export default class StatusRenderer extends Component {
  render() {
    const { value, colDef } = this.props;

    const status = value === colDef.predicate[0] ? colDef.predicate[1] : colDef.predicate[2];

    return (
      <div>
        <Badge status={status} text={value} />
      </div>
    );
  }
}
