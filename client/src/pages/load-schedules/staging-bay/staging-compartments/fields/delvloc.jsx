import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export default class DelvlocEditor extends Component {
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
    const { values, editableColumn, parentColumn, data } = this.props;
    const disabled = data?.[editableColumn] === undefined || data?.[editableColumn] ? false : true;
    const parentValue = data?.[parentColumn];

    return (
      <div style={{ display: 'flex' }}>
        <Select
          dropdownMatchSelectWidth={false}
          value={this.state.value}
          disabled={disabled}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
        >
          {values
            ?.filter((o) => !parentValue || o.parent === parentValue)
            ?.map((item) => (
              <Select.Option key={item.code} value={item.code}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      </div>
    );
  }
}
