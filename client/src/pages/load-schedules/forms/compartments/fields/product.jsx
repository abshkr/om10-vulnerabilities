import React, { Component } from 'react';
import { Select } from 'antd';

export default class Product extends Component {
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

    current[rowIndex].prod_code = record.key;
    current[rowIndex].prod_name = record.value;

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
        <Select value={this.state.value} style={{ width: '100%' }} onChange={this.onClick} bordered={false}>
          {values?.map((item) => (
            <Select.Option key={item.prod_code} value={item.prod_name}>
              {item.prod_name}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
