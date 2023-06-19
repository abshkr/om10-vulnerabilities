import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export default class CustomerEditor extends Component {
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
    const { values, editableColumn, products, flag, data } = this.props;
    const disabled = data?.[editableColumn] === undefined || data?.[editableColumn] ? false : true;
    console.log('................cus edit', disabled, editableColumn, data?.[editableColumn]);
    const prodCustomers = _.filter(
      products,
      (o) => data?.prod_code === o?.prod_code && data?.prod_cmpy === o?.prod_cmpy
    );
    const availCustomers = _.uniq(_.map(prodCustomers, 'cust_acct'));

    return (
      <div style={{ display: 'flex' }}>
        <Select
          dropdownMatchSelectWidth={false}
          allowClear
          value={this.state.value}
          disabled={disabled}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
        >
          {values
            ?.filter((itm) => !flag || availCustomers?.includes(itm.code))
            ?.map((item) => (
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