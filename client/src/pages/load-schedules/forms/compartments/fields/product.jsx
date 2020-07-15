import React, { Component } from 'react';
import { Select } from 'antd';

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
    // console.log(record)
    // console.log(value)

    if (!record) {
      const current = form.getFieldValue('compartments');
      
      current[rowIndex].prod_code = null;
      current[rowIndex].prod_name = null;
      current[rowIndex].qty_scheduled = 0;

      form.setFieldsValue({
        compartments: current,
      });
    } else {
      const current = form.getFieldValue('compartments');
      
      current[rowIndex].prod_code = record.key;
      current[rowIndex].prod_name = record.value;
      current[rowIndex].qty_scheduled = (current[rowIndex].qty_scheduled > 0 ? 
        current[rowIndex].qty_scheduled : parseInt(current[rowIndex].safefill));

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
    const { values } = this.props;

    return (
      <div style={{ width: '100%',  display: 'flex' }}>
        <Select value={this.state.value} style={{ width: '100%' }} onChange={this.onClick} bordered={false} allowClear={true}>
          {values?.map((item) => (
            <Select.Option key={item.prod_code} value={item.prod_name}>
              {item.prod_code + " - " + item.prod_name}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
