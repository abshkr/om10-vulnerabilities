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
    const { values, editableColumn, parentColumn, data, tableAPI } = this.props;
    // get defined customer and location
    let defCustomer = '';
    let defLocation = '';
    tableAPI.forEachNodeAfterFilterAndSort((node, tableIndex) => {
      if (
        data?.compartment !== node?.data?.compartment &&
        data?.trip_order_no === node?.data?.trip_order_no &&
        node?.data?.plss_staged_cust
      ) {
        defCustomer = node?.data?.plss_staged_cust;
      }
      if (
        data?.compartment !== node?.data?.compartment &&
        data?.trip_order_no === node?.data?.trip_order_no &&
        node?.data?.plss_staged_delvloc
      ) {
        defLocation = node?.data?.plss_staged_delvloc;
      }
    });

    const disabled = data?.[editableColumn] === undefined || data?.[editableColumn] ? false : true;
    const parentValue = data?.[parentColumn];

    return (
      <div style={{ display: 'flex' }}>
        <Select
          popupMatchSelectWidth={false}
          allowClear
          value={this.state.value}
          disabled={disabled}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
        >
          {values
            ?.filter(
              (o) =>
                (!parentValue || o.parent === parentValue) &&
                (defCustomer === '' || defCustomer === o?.parent) &&
                (defLocation === '' || defLocation === o?.code)
            )
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
