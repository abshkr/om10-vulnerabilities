import React, { Component } from 'react';
import { Select, Tag, Tooltip } from 'antd';
import _ from 'lodash';

export default class MassInAirRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  render() {
    const { massInVacuum, standardVolume, digits, factor, adtvFlag, adtvDigits, data } = this.props;
    // console.log('....................data', data);
    let newDigits = _.toNumber(!digits ? 0 : digits);
    if (data?.[adtvFlag] === true || data?.[adtvFlag] === '1') {
      newDigits = adtvDigits;
    }
    const precision = newDigits;

    // WiA = WiV - GSV x 0.0011
    const WiV = data?.[massInVacuum];
    const GSV = data?.[standardVolume];
    const AIR = !factor ? 0.0011 : factor;
    let WiA = undefined;
    let tipQty = undefined;
    if (!WiV || !GSV) {
      WiA = '';
      tipQty = '';
    } else {
      WiA = _.round(_.toNumber(WiV) - _.toNumber(GSV) * AIR, precision);
      tipQty = _.round(_.toNumber(WiV) - _.toNumber(GSV) * AIR, precision + 1);
    }

    return (
      <Tooltip placement="topRight" title={tipQty}>
        <div style={{ display: 'flex' }}>{WiA}</div>
      </Tooltip>
    );
  }
}
