import React, { Component } from 'react';
import { Select } from 'antd';

export default class SelectEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  isCancelBeforeStart() {
    const { data } = this.props;

    return !data?.editable;
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
      <Select value={this.state.value} size="small" onChange={this.onClick}>
        {values?.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
