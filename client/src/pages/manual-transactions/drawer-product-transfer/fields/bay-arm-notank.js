import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

import api, { MANUAL_TRANSACTIONS } from '../../../../api';
import {calcBaseRatios} from '../../../../utils'

export default class BayArm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      values: [],
      arms: [],
      isLoading: true,
    };
  }

  getValue() {
    return this.state.value;
  }

  calcDensity = (stream) => {
    const { values } = this.state;

    let index = undefined;
    let prodDens = 0.0;
    const sum_ratios = _.sumBy(values, (o)=>{
      if (o.stream_index === stream) {
        return _.toNumber(o.ratio_value);
      }
    });

    // calculate drawer product density
    for (index = 0; index < values.length; index++) {
      const item = values[index];
      if (item.stream_index === stream) {
        let ratio_total = item?.ratio_total;
        if (_.toNumber(ratio_total) > sum_ratios) {
          ratio_total = String(sum_ratios);
        }
        prodDens = prodDens + calcBaseRatios(item?.stream_tankden, item?.ratio_value, ratio_total);
      }
    }
    console.log('BayArm: prod density - ', prodDens);

    return prodDens;
  };

  onClick = (value, record) => {
    const { form, payload, setPayload } = this.props;

    // let current = payload;
    let current = form.getFieldValue('transfers');

    const key = this.props.data?.trsf_cmpt_no; // tnkr_cmpt_no;
    const index = _.findIndex(current, ['trsf_cmpt_no', key]);
    // console.log('BayArm, onClick', record?.item?.stream_index, this.props);

    current[index].trsf_arm_cd = record?.item?.stream_armcode;
    // current[index].trsf_qty_plan = null;
    // current[index].trsf_qty_left = null;
    // current[index].trsf_density = record?.item?.stream_tankden;
    current[index].trsf_density = this.calcDensity(record?.item?.stream_index);
    // current[index].trsf_temp = null;
    // current[index].trsf_qty_amb = null;
    // current[index].trsf_qty_cor = null;
    // current[index].trsf_load_kg = null;

    // console.log('BayArm, onClick', key, index, current);


    form.setFieldsValue({
      transfers: current,
    });

    setPayload(current);

    this.setState(
      {
        value: record?.item?.stream_armcode,
      },
      () => this.props.api.stopEditing()
    );
  };

  getArms = (items) => {
    const arms = [];
    console.log('BayArms: getArms - start', items);
    let itemExisted = false;

    _.forEach(items, (item) => {
      itemExisted = false;
      for (let index = 0; index < arms.length; index++) {
        const arm = arms[index];
        if (arm.stream_baycode === item.stream_baycode && arm.stream_armcode === item.stream_armcode && arm.stream_index === item.stream_index) {
          itemExisted = true;
		      break;
        }
      }
      if (!itemExisted) {
        arms.push(item);
      }
    });
    return arms;
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    api
    .get(MANUAL_TRANSACTIONS.GET_ARMS, {
      params: {
        prod_cmpy: this.props.data.trsf_prod_cmpy,
        prod_code: this.props.data.trsf_prod_code,
      },
    })
    .then((res) => {
      this.setState({
        isLoading: false,
        values: res.data?.records,
        arms: this.getArms(res.data?.records),
      });
    });
  }

  render() {
    const { isLoading, values, arms } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <Select
          value={this.state.value}
          style={{ width: '100%' }}
          loading={isLoading}
          onChange={this.onClick}
          bordered={false}
        >
          {/* {values?.map((item) => (
            <Select.Option
              key={`${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
              value={`${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
              item={item}
            >
              {`${item.ratio_seq}: ${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
            </Select.Option>
          ))} */}
          {arms?.map((item) => (
            <Select.Option
              key={`${item.stream_index} - ${item.stream_baycode} - ${item.stream_armcode}`}
              value={`${item.stream_index} - ${item.stream_baycode} - ${item.stream_armcode}`}
              item={item}
            >
              {`${item.stream_baycode} - ${item.stream_armcode}`}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}