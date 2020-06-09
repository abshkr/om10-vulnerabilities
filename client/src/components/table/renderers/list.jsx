import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export default class ListRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }


  render() {
    const { values } = this.props;

    const getText = (items, item) => {
      //let option = _.find(items, function(o) { return (_.split(o, '|'))[0] === item; });
      //return (_.split(option, '|'))[1];
      let option = _.find(items, function(o) { return o.code === item; });
      if (!!option) {
        return option?.name;
      } else {
        return item;
      }
      
    };

    return (
      <div style={{ display: 'flex' }}>
        {getText(values, this.state.value)}
      </div>
    );
  }
}
