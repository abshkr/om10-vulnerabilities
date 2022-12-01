import React, { Component } from 'react';
import { Descriptions, Popover, Tooltip } from 'antd';
import _ from 'lodash';

export default class TipTextRenderer extends Component {
  render() {
    const { value, tip, colDef } = this.props;
    // console.log('...........colDef', colDef);

    const tips = (
      <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
        <Descriptions.Item label={undefined} span={1}>
          {value}
        </Descriptions.Item>
      </Descriptions>
    );

    if (tip === 'TOOLTIP') {
      return (
        <Tooltip title={value} style={{ width: 800 }}>
          <span>{value}</span>
        </Tooltip>
      );
    } else if (tip === 'POPOVER') {
      return (
        <Popover placement="topRight" title={colDef.headerName} content={tips}>
          <span>{value}</span>
        </Popover>
      );
    } else {
      return (
        <div style={{ display: 'flex' }}>
          <span>{value}</span>
        </div>
      );
    }
  }
}
