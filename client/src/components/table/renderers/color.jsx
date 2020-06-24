import React, { Component } from 'react';
import { convertToLocale } from '../../../utils';

export default class ColorRenderer extends Component {
  render() {
    const { value } = this.props;
    return (
      <div style={{display: "flex", alignItems: "center"}}>
        <div style={{width:"4rem", marginRight:".5rem"}}>{value}</div>
        <div style={{height: ".75rem", width:"3rem", backgroundColor: `${value}`}}></div>
      </div>);
  }
}
