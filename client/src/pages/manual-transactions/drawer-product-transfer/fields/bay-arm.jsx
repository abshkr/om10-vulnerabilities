import React, { Component } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { MANUAL_TRANSACTIONS } from '../../../../api';

export default class BayArm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      values: [],
      isLoading: true,
    };
  }

  getValue() {
    return this.state.value;
  }

  onClick = (value, record) => {
    const { form, setPayload } = this.props;

    let current = form.getFieldValue('products');

    const key = this.props.data?.tnkr_cmpt_no;
    const index = _.findIndex(current, ['tnkr_cmpt_no', key]);

    current[index].arm_code = record?.item?.stream_armcode;

    form.setFieldsValue({
      products: current,
    });

    this.setState(
      {
        value: record?.item?.stream_armcode,
      },
      () => this.props.api.stopEditing()
    );
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    axios
      .get(MANUAL_TRANSACTIONS.GET_ARMS, {
        params: {
          prod_cmpy: this.props.data.prod_cmpy,
          prod_code: this.props.data.prod_code,
        },
      })
      .then((res) => {
        this.setState({
          isLoading: false,
          values: res.data?.records,
        });
      });
  }

  render() {
    const { isLoading, values } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <Select
          value={this.state.value}
          style={{ width: '100%' }}
          loading={isLoading}
          onChange={this.onClick}
          bordered={false}
        >
          {values?.map((item) => (
            <Select.Option
              key={`${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
              value={`${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
              item={item}
            >
              {`${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
