import React, { Component } from 'react';
import { Tooltip } from 'antd';
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
    const newDigits = _.toNumber(!digits ? 2 : digits);
    const temperature = _.round(_.toNumber(this.state.value), newDigits);

    return (
      <Tooltip placement="topRight" title={this.state.value}>
        <div style={{ display: 'flex' }}>{!this.state.value ? this.state.value : temperature}</div>
      </Tooltip>
    );
  }
}
