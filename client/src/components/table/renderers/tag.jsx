import React, { Component } from 'react';
import { Tag } from 'antd';
import _ from 'lodash';

export default class TagRenderer extends Component {
  render() {
    const { value, colDef } = this.props;

    const IS_ARRAY = _.isArray(value);

    if (IS_ARRAY) {
      return (
        <div>
          {value?.map((site) => (
            <Tag color="blue" key={site} style={{ marginRight: 2 }}>
              {site}
            </Tag>
          ))}
        </div>
      );
    }

    return (
      <div>
        <Tag color={colDef.color || value}>{value}</Tag>
      </div>
    );
  }
}
