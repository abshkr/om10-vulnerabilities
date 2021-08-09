import React, { Component } from 'react';
import { Select, Tag, Tooltip } from 'antd';
import _ from 'lodash';
import { DecimalThousandSeparator } from 'components';

export default class QuantitySeperatorRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  render() {
    const { digits, min, adtvFlag, adtvDigits, data, type } = this.props;
    let newDigits = _.toNumber(!digits ? 0 : digits);
    let tipDigits = newDigits + 1;
    const isFlag = adtvFlag?.indexOf('flag') >= 0;
    const isAdditive = isFlag
      ? data?.[adtvFlag] === true || data?.[adtvFlag] === '1'
      : String(data?.[adtvFlag]) === '6' || String(data?.[adtvFlag]) === '11';
    if (isAdditive) {
      newDigits = adtvDigits;
      tipDigits = newDigits + 1;
    } else {
      if (_.toNumber(this.state.value) < _.toNumber(min)) {
        // newDigits = 3;
        tipDigits = 3;
      }
    }
    const quantity = _.round(_.toNumber(this.state.value), newDigits);
    const tipQty = _.round(_.toNumber(this.state.value), tipDigits);

    return (
      <Tooltip placement="topRight" title={tipQty}>
        <div style={{ display: 'flex' }}>
          <DecimalThousandSeparator
            text={!this.state.value ? this.state.value : quantity}
            type={type}
          ></DecimalThousandSeparator>
        </div>
      </Tooltip>
    );
  }
}
