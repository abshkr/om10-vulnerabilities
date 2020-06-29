import React, { Component } from 'react';
import _ from 'lodash';

export default class DensityRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }


  render() {
    const { digits } = this.props;
    const density = _.round(_.toNumber(this.state.value), (!digits ? 3 : digits));

    return (
      <div style={{ display: 'flex' }}>
        {density}
      </div>
    );
  }
}
