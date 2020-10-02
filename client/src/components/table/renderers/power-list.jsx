import React, { Component } from 'react';
import _ from 'lodash';

export default class PowerListRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  groupValuesByKeys = (data, keys) => {
    let txt = '';
    _.forEach(keys, (key) => {
      if (txt.length > 0) {
        txt = txt + ' - ';
      }
      txt = txt + data[key];
    });
    return txt;
  };

  getText = (items, codes, names, columns, data) => {
    // let option = _.find(items, function(o) { return o.code === item; });
    let option = _.find(items, (item) => (
      this.groupValuesByKeys(item, codes) === this.groupValuesByKeys(data, columns)
    ));
    if (!option) {
      return this.state.value;
    } else {
      return this.groupValuesByKeys(option, names);
    }
  };


  render() {
    const { values, codes, names, columns, data } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        {this.getText(values, codes, names, columns, data)}
      </div>
    );
  }
}
