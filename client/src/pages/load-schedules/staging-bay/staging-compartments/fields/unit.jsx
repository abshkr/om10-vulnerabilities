import React, { Component } from 'react';
import { Select } from 'antd';

export default class Unit extends Component {
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
    const { form, rowIndex } = this.props;

    let current = form.getFieldValue('compartments');

    current[rowIndex].unit_code = record?.key;
    current[rowIndex].unit_name = record?.value;

    form.setFieldsValue({
      compartments: current,
    });

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
          allowClear
          value={this.state.value}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
        >
          {values?.map((item) => (
            <Select.Option key={item.unit_id} value={item.description}>
              {item.description}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
