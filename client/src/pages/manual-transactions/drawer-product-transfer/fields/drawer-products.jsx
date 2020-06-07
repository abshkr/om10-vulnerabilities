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
    const { form, setPayload, t } = this.props;

    let current = form.getFieldValue('products');

    const key = this.props.data?.tnkr_cmpt_no;
    const index = _.findIndex(current, ['tnkr_cmpt_no', key]);

    current[index].prod_code = record?.item?.prod_code;
    current[index].prod_name = record.children;
    current[index].prod_cmpy = record?.item?.prod_cmpy;
    current[index].arm_code = t('placeholder.selectArmCode');
    current[index].dens = null;
    current[index].temperature = null;
    current[index].cor_vol = null;
    current[index].amb_vol = null;
    current[index].liq_kg = null;

    form.setFieldsValue({
      products: current,
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
