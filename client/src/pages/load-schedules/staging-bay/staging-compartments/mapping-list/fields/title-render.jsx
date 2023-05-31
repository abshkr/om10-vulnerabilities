import React, { Component } from 'react';

export default class TitleRender extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      value: this.props.value,
    };
  }

  render() {
    return <div style={{ width: '100%', display: 'flex', fontWeight: 'bold' }}>{this.state.value}</div>;
  }
}
