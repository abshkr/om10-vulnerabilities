import React, { Component } from 'react';
import { Select, Tag, Tooltip } from 'antd';
import _ from 'lodash';

export default class QuantityRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  render() {
    const { digits, min, adtvFlag, adtvDigits, data } = this.props;
    let newDigits = _.toNumber(!digits ? 0 : digits);
    if (data?.[adtvFlag] === true || data?.[adtvFlag] === '1') {
      newDigits = adtvDigits;
    } else {
      if (_.toNumber(this.state.value) < _.toNumber(min)) {
        newDigits = 3;
      }
    }
    const quantity = _.round(_.toNumber(this.state.value), newDigits);
    const tipQty = _.round(_.toNumber(this.state.value), newDigits + 1);

    return (
      <Tooltip placement="topRight" title={tipQty}>
        <div style={{ display: 'flex' }}>{!this.state.value ? this.state.value : quantity}</div>
      </Tooltip>
    );
  }
}
