import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

import {getAvailableArms} from '../../../../utils'

export default class DrawerProducts extends Component {
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
    const { form, arms, payload, setPayload, t } = this.props;

    // let current = payload;
    let current = form.getFieldValue('transfers');

    const key = this.props.data?.trsf_cmpt_no; // tnkr_cmpt_no;
    const index = _.findIndex(current, ['trsf_cmpt_no', key]);
    console.log('DrawerProducts, onClick', key, index, record, this.props);

    const items = getAvailableArms(arms, record?.item?.prod_cmpy, record?.item?.prod_code);

    current[index].trsf_prod_code = record?.item?.prod_code;
    current[index].trsf_prod_name = record.children;
    current[index].trsf_prod_cmpy = record?.item?.prod_cmpy;
    current[index].trsf_arm_cd = items?.length>0 ? t('placeholder.selectArmCode') : t('placeholder.noArmAvailable');
    // current[index].trsf_qty_plan = null;
    // current[index].trsf_qty_left = null;
    current[index].trsf_density = null;
    current[index].trsf_temp = null;
    current[index].trsf_qty_cor = null;
    current[index].trsf_qty_amb = null;
    current[index].trsf_load_kg = null;

    /* form.setFieldsValue({
      transfers: current,
    }); */

    setPayload(current);

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
            <Select.Option key={item.prod_code} value={item.prod_name} item={item}>
              {`${item.prod_code} - ${item.prod_name} (Planned: ${item.qty_scheduled} | Loaded: ${item.qty_loaded} | ${item.unit_name})`}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
