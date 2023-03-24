import React, { Component } from 'react';
import { Select, Tag, Tooltip } from 'antd';
import _ from 'lodash';

export default class VcfRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  render() {
    const { ambientVolume, standardVolume, digits, data } = this.props;
    // console.log('....................data', data);
    let newDigits = _.toNumber(!digits ? 5 : digits);
    const precision = newDigits;

    const GOV = data?.[ambientVolume];
    const GSV = data?.[standardVolume];
    let VCF = this.state.value;
    if (!VCF) {
      if (!GOV || !GSV) {
        VCF = undefined;
      } else {
        const numberGSV = _.toNumber(GSV);
        const invalidGSV = _.isNaN(numberGSV);
        const numberGOV = _.toNumber(GOV);
        const invalidGOV = _.isNaN(numberGOV);
        if (!invalidGSV && !invalidGOV && numberGOV !== 0 && numberGSV !== 0) {
          VCF = numberGSV / numberGOV;
        } else {
          VCF = undefined;
        }
      }
    }

    const vcfQty = VCF === undefined ? '' : _.round(VCF, precision);
    const tipQty = VCF === undefined ? '' : _.round(VCF, precision + 1);

    return (
      <Tooltip placement="topRight" title={tipQty}>
        <div style={{ display: 'flex' }}>{vcfQty}</div>
      </Tooltip>
    );
  }
}
