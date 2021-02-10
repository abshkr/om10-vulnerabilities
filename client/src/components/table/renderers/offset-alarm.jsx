import React, { Component } from 'react';
import { Tag } from 'antd';
import _ from 'lodash';

export default class OffsetAlarmRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  render() {
    const { color, fieldOrigin, fieldCustom, note, unit, type, data } = this.props;
    //console.log("quantity renderer, props", this.props);
    const valueOrigin = data?.[fieldOrigin];
    const valueCustom = data?.[fieldCustom];
    const valueOffset = _.toNumber(valueCustom) - _.toNumber(valueOrigin);

    const alarmValue =
      type === 1
        ? valueOffset
        : type === 2
        ? '*' + note
        : '*' + note + ': ' + valueOffset + ' (' + unit + ')';

    return (
      <div style={{ display: 'flex' }}>{valueOffset !== 0 && <Tag color={color}>{alarmValue}</Tag>}</div>
    );
  }
}
