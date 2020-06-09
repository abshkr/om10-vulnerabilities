import React, { Component } from 'react';
import { Select } from 'antd';

export default class Equipment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  getValue() {
    return this.state.value;
  }

  onClick = (value, record) => {
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
        <Select value={this.state.value} style={{ width: '100%' }} onChange={this.onClick} bordered={false}>
          {values?.map((item) => (
            <Select.Option key={item.partner_code} value={item.partner_code}>
              {`${item.partner_code} - ${item.partner_name1}`}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
