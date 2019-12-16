import React, { Component } from 'react';
import { convertToLocale } from '../../../utils';

export default class DateRenderer extends Component {
  render() {
    const { value } = this.props;
    return <div>{convertToLocale(value)}</div>;
  }
}
