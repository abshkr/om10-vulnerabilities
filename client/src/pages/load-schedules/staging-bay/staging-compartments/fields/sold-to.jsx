import React, { Component } from 'react';
import { Select } from 'antd';

export default class SoldTo extends Component {
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

    current[rowIndex].schd_sold_to_num = record.key;

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
      <div style={{ width: '100%', display: 'flex' }}>
        <Select
          popupMatchSelectWidth={false}
          allowClear
          value={this.state.value}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
        >
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
