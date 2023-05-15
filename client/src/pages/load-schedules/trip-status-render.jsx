import React, { Component } from 'react';
import './source-render.css';

/*
  STATS
  1	F	NEW SCHEDULE
  2	S	SPECED
  3	A	ACTIVE
  4	L	LOADING
  5	E	ENDED
  6	D	DELIVERED OK
*/
/*
  SHLS_PICKUP_MODE
  0: Normal Load
  1: Pickup Load
  2: Staged Load
*/

export default class TripStatusRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  getColor = () => {
    const { data, flag } = this.props;
    const code = data?.status;
    const mode = data?.shls_pickup_mode;

    // use color to distingusish the trip status
    let color = 'black';
    if (code === 'E' || code === 'D') {
      color = '#00ff00'; // GREEN = ENDED or DELIVERED OK
    } else if (code === 'A') {
      color = '#ff0000'; // LIGHT RED = ACTIVE
    } else if (code === 'L') {
      color = '#880000'; // DARK RED = LOADING
    } else {
      color = '#0000ff'; // LIGHT BLUE= NEW SCHEDULE or SPECED
      if (flag && mode === '2') {
        color = '#000088';
      }
    }

    return color;
  };

  getLabel = () => {
    const { data, t, flag } = this.props;
    const code = data?.status;
    const mode = data?.shls_pickup_mode;

    if (flag && mode === '2' && (code === 'F' || code === 'D' || code === 'E')) {
      return `${t('fields.stagingBayStagedStat')} / ${this.state.value}`;
    } else {
      return this.state.value;
    }
  };

  getWeight = () => {
    const { data, t, flag } = this.props;
    const code = data?.status;
    const mode = data?.shls_pickup_mode;

    // if (flag && mode === "2" && (code === "F" || code === "D" || code === "E")) {
    if (flag && mode === '2') {
      return 'bold';
    } else {
      return 'normal';
    }
  };

  render() {
    return (
      <div style={{ width: '100%', display: 'flex', color: this.getColor(), fontWeight: this.getWeight() }}>
        {this.getLabel()}
      </div>
    );
  }
}
