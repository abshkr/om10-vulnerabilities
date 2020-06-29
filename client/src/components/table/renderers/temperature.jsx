import React, { Component } from 'react';
import _ from 'lodash';

export default class TemperatureRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }


  render() {
    const { digits } = this.props;
    const temperature = _.round(_.toNumber(this.state.value), (!digits ? 2 : digits));

    return (
      <div style={{ display: 'flex' }}>
        {temperature}
      </div>
    );
  }
}
