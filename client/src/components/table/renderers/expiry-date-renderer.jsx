import React, { Component } from 'react';
import { convertToLocale } from 'utils';

export default class ExpiryDateRenderer extends Component {
  render() {
    const { value, sequence } = this.props;
    return (
      value.length >= sequence + 1 ? 
      <div>{convertToLocale(value[sequence].ed_exp_date)}</div>:
      <div></div>
    )
  }
}
