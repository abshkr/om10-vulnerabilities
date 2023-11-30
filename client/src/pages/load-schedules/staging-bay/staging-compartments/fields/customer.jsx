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
    const { values, editableColumn, products, flag, data, tableAPI } = this.props;
    // get defined customer
    let defCustomer = '';
    tableAPI.forEachNodeAfterFilterAndSort((node, tableIndex) => {
      if (
        data?.compartment !== node?.data?.compartment &&
        data?.trip_order_no === node?.data?.trip_order_no &&
        node?.data?.plss_staged_cust
      ) {
        defCustomer = node?.data?.plss_staged_cust;
      }
    });

    // console.log('...........props', this.props);
    const disabled = data?.[editableColumn] === undefined || data?.[editableColumn] ? false : true;
    console.log('................cus edit', disabled, editableColumn, data?.[editableColumn]);
    const prodCustomers = _.filter(
      products,
      (o) =>
        data?.prod_code === o?.prod_code &&
        data?.prod_cmpy === o?.prod_cmpy &&
        (defCustomer === '' || defCustomer === o?.cust_acct)
    );
    const availCustomers = _.uniq(_.map(prodCustomers, 'cust_acct'));

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
