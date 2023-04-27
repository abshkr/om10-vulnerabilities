import React, { Component } from 'react';

export default class SupplierRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  getSupplier = () => {
    const { data, typeColumn, typeValue, supplierColumn, ownerColumn } = this.props;
    // const code = this.state.value;
    const type = data?.[typeColumn];

    let supplier = data?.[supplierColumn];
    if (
      (type === typeValue || typeValue.indexOf(type) >= 0) &&
      data.hasOwnProperty(ownerColumn) &&
      !!data?.[ownerColumn]
    ) {
      supplier = data?.[ownerColumn];
    }

    return supplier;
  };

  render() {
    return <div style={{ width: '100%', display: 'flex' }}>{this.getSupplier()}</div>;
  }
}
