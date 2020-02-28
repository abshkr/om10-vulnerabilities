import React, { Component } from 'react';

export default class NullRenderer extends Component {
  render() {
    return <span>{null}</span>;
  }
}
