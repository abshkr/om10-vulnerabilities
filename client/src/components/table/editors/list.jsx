import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export default class ListEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

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
    const { values } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <Select
          popupMatchSelectWidth={false}
          value={this.state.value}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
        >
          {values?.map((item) => (
            //<Select.Option key={(_.split(item, '|'))[0]} value={(_.split(item, '|'))[0]}>
            //  {(_.split(item, '|'))[1]}
            //</Select.Option>
            <Select.Option key={item.code} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
