import React, { Component } from 'react';
import _ from 'lodash';

export default class MassInAirRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  render() {
    const { massInVacuum, standardVolume, digits, data } = this.props;
    const precision = _.toNumber(!digits ? 0 : digits);
    // WiA = WiV - GSV x 0.0011
    const WiV = data?.[massInVacuum];
    const GSV = data?.[standardVolume];
    let WiA = undefined;
    if (!WiV || !GSV) {
      WiA = '';
    } else {
      WiA = _.round(_.toNumber(WiV) - _.toNumber(GSV) * 0.0011, precision);
    }

    return <div style={{ display: 'flex' }}>{WiA}</div>;
  }
}
