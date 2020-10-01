import React, { Component } from 'react';
import _ from 'lodash';

export default class PowerListRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  groupValuesByCodes = (data, codes) => {
    let txt = '';
    _.forEach(codes, (code) => {
      if (txt.length > 0) {
        txt = txt + ' - ';
      }
      txt = txt + data[code];
    });
    return txt;
  };

  getText = (items, codes, names, columns, data) => {
    // let option = _.find(items, function(o) { return o.code === item; });
    let option = _.find(items, (item) => (
      this.groupValuesByCodes(item, codes) === this.groupValuesByCodes(data, columns)
    ));
    if (!option) {
      return this.state.value;
    } else {
      return this.groupValuesByCodes(option, names);
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
