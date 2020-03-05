import React, { Component } from 'react';
import { Select } from 'antd';

export default class SelectEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  getValue() {
    return this.state.value;
  }

  onClick = value => {
    this.setState(
      {
        value
      },
      () => this.props.api.stopEditing()
    );
  };

  render() {
    const { values } = this.props;

    return (
      <Select value={this.state.value} style={{ width: '100%' }} onChange={this.onClick}>
        {values?.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
