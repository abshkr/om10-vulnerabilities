import React, { Component } from 'react';
import { Select, Tag } from 'antd';
import _ from 'lodash';

export default class TwinQuantityRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }


  render() {
    const { colorAvail, colorUsed, data } = this.props;
    //console.log("quantity renderer, props", this.props);
    const qtyTotal = data?.oitem_prod_qty;
    const qtyUsed = this.state.value;
    const qtyLeft = _.toNumber(qtyTotal) - _.toNumber(qtyUsed);

    return (
      <div style={{ display: 'flex' }}>
        {/* <span style={{ color: colorUsed }}>{qtyUsed}</span> */}
        {/* <span style={{ color: colorAvail }}>{qtyLeft}</span> */}
        <Tag color={colorUsed}>{qtyUsed}</Tag> / &nbsp;&nbsp;<Tag color={colorAvail}>{qtyLeft}</Tag>
      </div>
    );
  }
}
