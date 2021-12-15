import React, { Component } from 'react';
import { Tooltip } from 'antd';
import _ from 'lodash';

export default class PpmPercentageRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  };

  render() {
    const { value, adtvFlag, data } = this.props;

    const isFlag = adtvFlag?.indexOf('flag') >= 0;
    const isAdditive = isFlag
      ? data?.[adtvFlag] === true || data?.[adtvFlag] === '1'
      : String(data?.[adtvFlag]) === '6' || String(data?.[adtvFlag]) === '11';

    let percentQty = undefined;
    let tipQty = undefined;
    if (isAdditive) {
      // display in ppm
      // percentQty = data?.[valueField] + ' ppm';
      percentQty = value === undefined || value === null ? '' : value + ' ppm';
      tipQty = value === undefined || value === null ? '' : value;
    } else {
      percentQty = value === undefined || value === null ? '' : value + ' %';
      tipQty = value === undefined || value === null ? '' : value * 10000;
    }

    return (
      <Tooltip placement="topRight" title={tipQty}>
        <div style={{ display: 'flex' }}>{percentQty}</div>
      </Tooltip>
    );
  }
}
