import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

import api, { MANUAL_TRANSACTIONS } from '../../../../api';
import {calcBaseRatios, calcArmDensity, adjustProductArms} from '../../../../utils'

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

  calcDensity = (armcode) => {
    const { values } = this.state;
    const prodDens = calcArmDensity(armcode, values);

    console.log('BayArm: prod density - ', prodDens);

    return prodDens;
  };

  onClick = (value, record) => {
    const { form, payload, setPayload } = this.props;

    // let current = payload;
    let current = form.getFieldValue('transfers');

    const key = this.props.data?.trsf_cmpt_no; // tnkr_cmpt_no;
    const index = _.findIndex(current, ['trsf_cmpt_no', key]);
    // console.log('BayArm, onClick', record?.item?.stream_armcode, this.props);

    current[index].trsf_arm_cd = record?.item?.stream_armcode;
    // current[index].trsf_qty_plan = null;
    // current[index].trsf_qty_left = null;
    // current[index].trsf_density = record?.item?.stream_tankden;
    current[index].trsf_density = this.calcDensity(record?.item?.stream_armcode);
    // current[index].trsf_temp = null;
    // current[index].trsf_qty_amb = null;
    // current[index].trsf_qty_cor = null;
    // current[index].trsf_load_kg = null;

    console.log('BayArm, onClick', key, index, record, current);


    /* form.setFieldsValue({
      transfers: current,
    }); */

    setPayload(current);

    this.setState(
      {
        value: record?.item?.stream_armcode,
      },
      () => this.props.api.stopEditing()
    );
  };

  componentDidMount() {
    const { arms, t } = this.props;

    const armsByProd = adjustProductArms(arms, this.props.data.trsf_prod_cmpy, this.props.data.trsf_prod_code);
    console.log('BayArms componentDidMount', arms, armsByProd, this.props.data);

    this.setState({
      isLoading: false,
      values: armsByProd,
    });

    const items = _.filter(armsByProd, (o) => (
      o.stream_bclass_code !== '6' && String(o.arm_bases) === o.rat_count && o.rat_seq === '1'
    ));
    if (items?.length === 0) {
      this.setState(
        {
          value: t('placeholder.noArmAvailable'),
        },
      );
    }

    /* this.setState({
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
      });
    }); */
  }

  render() {
    const { isLoading, values } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <Select
          dropdownMatchSelectWidth={false}
          value={this.state.value}
          style={{ width: '100%' }}
          loading={isLoading}
          onChange={this.onClick}
          bordered={false}
        >
          {_.filter(values, (o) => (o.stream_bclass_code!=='6' && String(o.arm_bases)===o.rat_count) && o.rat_seq === '1')?.map((item) => (
            <Select.Option
              key={`${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
              value={`${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
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
