import React, { Component } from 'react';
import { Input } from 'antd';

export default class FuzzyFilter extends Component {
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
    let newValue = event?.target?.value || '';
    if (this.state.text !== newValue) {
      this.setState(
        {
          text: newValue
        },
        () => {
          this.props.filterChangedCallback();
        }
      );
    }
  };

  setModel(model) {
    this.onChange('');
  }

  render() {
    const { colDef, column } = this.props;
    const t = column?.userProvidedColDef?.filterParams?.t;

    return (
      <div className="search-tab">
        <div className="filter-header">{t('fields.filterBy')} {colDef.headerName}</div>
        <Input.Search
          size="small"
          placeholder={`${t('operations.search')} ${colDef.headerName}`}
          value={this.state.text}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
