import React, { Component } from 'react';
import { Select } from 'antd';

export default class Equipment extends Component {
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
    const { form, rowIndex, colDef } = this.props;

    let current = form.getFieldValue('transfers');

    current[rowIndex][colDef.field] = value;

    form.setFieldsValue({
      transfers: current,
    });

    this.setState(
      {
        value,
      },
      () => this.props.api.stopEditing()
    );
  };

  render() {
    const { values } = this.props;
    // console.log('MT Equipment Column', values, this.props);

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
            <Select.Option key={item.tc_eqpt} value={item.eqpt_code}>
              {`${item.eqpt_code}${item.eqpt_code === item.eqpt_title ? '' : '[' + item.eqpt_title + ']'}`}
              {/* {`${values?.length>1 ? (item.tc_seqno + ' - ') : ''}${item.eqpt_code}${item.eqpt_code===item.eqpt_title?'':('['+item.eqpt_title+']')}`} */}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
