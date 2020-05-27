import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export default class UnitEditor extends Component {
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

    let current = form.getFieldValue('order_items');

    const index = _.findIndex(current, ['oitem_prod_code', this.props.data.oitem_prod_code]);

    current[index].oitem_prod_unit = record.key;

    form.setFieldsValue({
      order_items: current,
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

    return (
      <div style={{ display: 'flex' }}>
        <Select value={this.state.value} style={{ width: '100%' }} onChange={this.onClick} bordered={false}>
          {values?.map((item) => (
            <Select.Option key={item.unit_id} value={item.description}>
              {item.description}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
