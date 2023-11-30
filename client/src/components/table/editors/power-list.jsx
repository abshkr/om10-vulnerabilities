import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export default class PowerListEditor extends Component {
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
    let option = _.find(
      items,
      (item) => this.groupValuesByKeys(item, codes) === this.groupValuesByKeys(data, columns)
    );
    if (!option) {
      return this.state.value;
    } else {
      return this.groupValuesByKeys(option, names);
    }
  };

  getValue() {
    return this.state.value;
  }

  onClick = (value) => {
    this.setState(
      {
        value,
      },
      () => this.props.api.stopEditing()
    );
  };

  render() {
    const { values, pcodes, names, pcolumns, ccodes, ccolumns, data } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <Select
          popupMatchSelectWidth={false}
          value={this.state.value}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
        >
          {values
            ?.filter(
              (item) => this.groupValuesByKeys(item, pcodes) === this.groupValuesByKeys(data, pcolumns)
            )
            ?.map((item) => (
              <Select.Option
                key={this.groupValuesByKeys(item, ccodes)}
                value={this.groupValuesByKeys(item, ccodes)}
              >
                {this.groupValuesByKeys(item, names)}
              </Select.Option>
            ))}
        </Select>
      </div>
    );
  }
}
