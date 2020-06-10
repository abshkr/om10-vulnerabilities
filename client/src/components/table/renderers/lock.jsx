import React, { Component } from 'react';
import { Icons } from '../../';

export default class LockRenderer extends Component {
  render() {
    const { value } = this.props;
    return <div>{value ? <Icons type="lock" size={18} /> : <Icons type="unlock" size={18} />}</div>;
  }
}
