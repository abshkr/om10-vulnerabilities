import React, { Component } from 'react';
import { Select, Avatar } from 'antd';
import _ from 'lodash';

export default class Product extends Component {
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
    const { form, rowIndex } = this.props;
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', record)
    // console.log(value)

    if (!record) {
      const current = form.getFieldValue('compartments');

      current[rowIndex].prod_code = '';
      current[rowIndex].prod_name = '';
      current[rowIndex].qty_scheduled = 0;

      form.setFieldsValue({
        compartments: current,
      });
    } else {
      const current = form.getFieldValue('compartments');
      const ordered = _.toNumber(record?.item?.qty_scheduled);
      const planned = _.sumBy(
        current.filter((o) => o?.prod_code === record?.item?.prod_code),
        'qty_scheduled'
      );
      const availQty = parseInt(ordered - planned);
      const safeQty = parseInt(current[rowIndex].safefill);
      const cmptQty = availQty >= safeQty ? safeQty : availQty;
      console.log('...........ordered, planned', ordered, planned);

      current[rowIndex].prod_code = record.key;
      current[rowIndex].prod_name = record.value;
      current[rowIndex].qty_scheduled =
        current[rowIndex].qty_scheduled > 0
          ? current[rowIndex].qty_scheduled > cmptQty
            ? cmptQty
            : current[rowIndex].qty_scheduled
          : cmptQty;

      form.setFieldsValue({
        compartments: current,
      });
    }

    this.setState(
      {
        value,
      },
      () => this.props.api.stopEditing()
    );
  };

  render() {
    const { values, form } = this.props;
    const current = form.getFieldValue('compartments');

    _.forEach(values, (item) => {
      const ordered = _.toNumber(item?.qty_scheduled);
      const planned = _.sumBy(
        current.filter((o) => o?.prod_code === item?.prod_code),
        'qty_scheduled'
      );
      item.disabled = planned >= ordered;
    });

    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <Select
          dropdownMatchSelectWidth={false}
          showSearch
          value={this.state.value}
          style={{ width: '100%' }}
          onChange={this.onClick}
          bordered={false}
          allowClear={!!this.state.value}
        >
          {values?.map((item) => (
            <Select.Option key={item.prod_code} value={item.prod_name} item={item} disabled={item.disabled}>
              {/* <Avatar 
                size="small"
                src={`api/assets/products/${item.prod_image}`} 
                shape="square" 
                style={{marginRight:"5px", visibility:item.prod_image? "visible": "hidden"}}
              /> */}
              {item.prod_code +
                ' - ' +
                item.prod_name +
                ' (' +
                item.qty_scheduled +
                ' ' +
                item.unit_name +
                ')'}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
