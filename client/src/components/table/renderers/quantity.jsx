import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export default class ListRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }


  render() {
    const { colorAvail, colorUsed, data } = this.props;
    //console.log("quantity renderer, props", this.props);
    const total = data?.oitem_prod_qty;
    return (
      <div style={{ display: 'flex' }}>
        <span style={{ color: colorUsed }}>{this.state.value}</span>
         /  
        <span style={{ color: colorAvail }}>{_.toNumber(total) - _.toNumber(this.state.value)}</span>
      </div>
    );
  }
}
