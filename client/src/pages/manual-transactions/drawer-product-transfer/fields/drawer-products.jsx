import React, { Component } from 'react';
import { Select, notification } from 'antd';
import _ from 'lodash';

import { calcBaseRatios, calcArmDensity, getAvailableArms, adjustProductArms } from '../../../../utils';

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

  calcDensity = (armcode, values) => {
    const prodDens = calcArmDensity(armcode, values);
    // console.log('DrawerProducts: prod density - ', prodDens);

    return prodDens;
  };

  onClick = (value, record) => {
    const { form, arms, sourceType, loadType, payload, setPayload, t } = this.props;

    // let current = payload;
    let current = form.getFieldValue('transfers');

    const key = this.props.data?.trsf_cmpt_no; // tnkr_cmpt_no;
    const index = _.findIndex(current, ['trsf_cmpt_no', key]);
    // console.log('DrawerProducts, onClick', key, index, record, this.props);

    const items = getAvailableArms(arms, record?.item?.prod_cmpy, record?.item?.prod_code);
    const prodArms = adjustProductArms(arms, record?.item?.prod_cmpy, record?.item?.prod_code);
    // console.log('DrawerProducts, onClick, Arms', items, prodArms);

    current[index].trsf_prod_code = record?.item?.prod_code;
    current[index].trsf_prod_name = record.children;
    // current[index].trsf_prod_name = record?.item?.prod_desc;
    current[index].trsf_prod_cmpy = record?.item?.prod_cmpy;
    // current[index].trsf_arm_cd = items?.length>0 ? t('placeholder.selectArmCode') : t('placeholder.noArmAvailable');
    current[index].trsf_arm_cd =
      items?.length > 0 ? items?.[0]?.stream_armcode : t('placeholder.noArmAvailable');
    // console.log('DrawerProducts, onClick, current', current);
    if (sourceType === 'OPENORDER' || (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT')) {
      current[index].trsf_qty_plan = record?.item?.qty_planned;
      current[index].trsf_qty_left = record?.item?.qty_loaded;
      const plan_qty = _.round(_.toNumber(record?.item?.qty_planned), 0);
      const load_qty = _.round(_.toNumber(record?.item?.qty_loaded), 0);
      // if (plan_qty > 0 && load_qty > 0 && plan_qty === load_qty) {
      if (plan_qty > 0 && load_qty > 0 && plan_qty <= load_qty) {
        notification.error({
          key: 'prod_plan_load',
          message: t('prompts.productFullyLoaded'),
          description: t('fields.scheduled') + ': ' + plan_qty + ', ' + t('fields.loaded') + ': ' + load_qty,
        });
      }
    }
    current[index].trsf_density =
      items?.length > 0 ? this.calcDensity(items?.[0]?.stream_armcode, prodArms) : null;
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
    const { values, t } = this.props;

    _.forEach(
      values,
      (item) =>
        // `${item.prod_desc} (Planned: ${sourceType==='SCHEDULE' ? item.qty_scheduled : item.schp_specqty} | Loaded: ${item.qty_loaded||0} | ${item.unit_name})`
        (item.prod_text = `${item.prod_desc} (${t('fields.planned')}: ${item.qty_planned || 0} | ${t(
          'fields.loaded'
        )}: ${item.qty_loaded || 0} | ${item.unit_name})`)
    );

    return (
      <div style={{ display: 'flex' }}>
        <Select
          dropdownMatchSelectWidth={false}
          allowClear
          value={this.state.value}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
        >
          {values?.map((item) => (
            <Select.Option key={item.prod_code} value={item.prod_desc} item={item}>
              {item.prod_text}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
