import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

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
    console.log('DrawerProducts, onClick', key, index, this.props);

    const armsByProd = _.filter(arms, (o) => (
      o.rat_prod_prodcmpy === record?.item?.prod_cmpy && o.rat_prod_prodcode === record?.item?.prod_code
    ));
    const basesByArm = {};
    _.forEach(armsByProd, (o) => {
      if (basesByArm.hasOwnProperty(o.stream_armcode)) {
        basesByArm[o.stream_armcode] += 1;
      } else {
        basesByArm[o.stream_armcode] = 1;
      }
      o.rat_arm_bases = 0;
    });
    _.forEach(armsByProd, (o) => {
      if (basesByArm.hasOwnProperty(o.stream_armcode)) {
        o.rat_arm_bases = basesByArm[o.stream_armcode];
      } 
    });

    const items = _.filter(armsByProd, (o) => (
      o.stream_bclass_code !== '6' && String(o.rat_arm_bases) === o.rat_count
    ));

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

    form.setFieldsValue({
      transfers: current,
    });

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
