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
    const { total, colorAvail, colorUsed } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <span style={{ color: colorUsed }}>{this.state.value}</span>
         /  
        <span style={{ color: colorAvail }}>{_.toNumber(total) - _.toNumber(this.state.value)}</span>
      </div>
    );
  }
}
