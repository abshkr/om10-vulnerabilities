import React, { Component } from 'react';

export default class ColorRenderer extends Component {
  render() {
    const { value } = this.props;
    if (value === '' || value === null || value === undefined) {
      return (<div/>);
    } else {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ height: '24px', width: '80px', border: '4px ridge black', backgroundColor: `${value}` }}></div>
          <div style={{ marginleft: '10px' }}>{value}</div>
        </div>
      );
    }
  }
}
