import React, { Component } from 'react';
import { Input } from 'antd';

export default class FuzzyFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  isFilterActive = () => {
    return this.state.text !== null && this.state.text !== undefined && this.state.text !== '';
  };

  doesFilterPass = params => {
    return this.state.text
      .toLowerCase()
      .split(' ')
      .every(filterWord => {
        return (
          this.props
            .valueGetter(params.node)
            .toString()
            .toLowerCase()
            .indexOf(filterWord) >= 0
        );
      });
  };

  onChange = event => {
    let newValue = event.target.value;
    if (this.state.text !== newValue) {
      this.setState(
        {
          text: newValue,
        },
        () => {
          this.props.filterChangedCallback();
        },
      );
    }
  };

  render() {
    const { colDef } = this.props;

    return (
      <div className="search-tab">
        <div className="filter-header">Filter By {colDef.headerName}</div>
        <Input.Search
          size="small"
          placeholder={`Search ${colDef.headerName}`}
          value={this.state.text}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
