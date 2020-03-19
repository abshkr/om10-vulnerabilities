import React, { Component } from 'react';
import { Checkbox, Divider } from 'antd';

export default class BooleanFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  isFilterActive = () => {
    return this.state.text !== null && this.state.text !== undefined && this.state.text !== '';
  };

  doesFilterPass = params => {
    const text = this.props
      .valueGetter(params.node)
      .toString()
      .toLowerCase();

    return this.state.text.includes(text);
  };

  onChange = values => {
    if (this.state.text !== values) {
      const payload = values.length > 0 ? values : '';

      this.setState(
        {
          text: payload
        },
        () => {
          this.props.filterChangedCallback();
        }
      );
    }
  };

  render() {
    const { colDef } = this.props;

    const options = [
      { label: 'True', value: 'true' },
      { label: 'False', value: 'false' }
    ];

    return (
      <div className="search-tab">
        <div className="filter-header">Filter By {colDef.headerName}</div>
        <Divider style={{ marginTop: 10, marginBottom: 7 }} />
        <Checkbox.Group options={options} onChange={this.onChange} />
      </div>
    );
  }
}
