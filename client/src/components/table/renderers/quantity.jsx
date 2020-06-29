import React, { Component } from 'react';
import { Select, Tag } from 'antd';
import _ from 'lodash';

export default class QuantityRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }


  render() {
    const { digits, min, data } = this.props;
    let newDigits = _.toNumber(!digits ? 0 : digits);
    if ( data?.trsf_bs_adtv_flag_tot === true || data?.trsf_bs_adtv_flag === true ) {
      newDigits = 3;
    } else {
      if (_.toNumber(this.state.value) < _.toNumber(min)) {
        newDigits = 3;
      }
    }
    const quantity = _.round(_.toNumber(this.state.value), newDigits);

    return (
      <div style={{ display: 'flex' }}>
        {!this.state.value ? this.state.value : quantity}
      </div>
    );
  }
}
