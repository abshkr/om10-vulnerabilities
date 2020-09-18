import React, { Component } from 'react';
import { Checkbox, Divider } from 'antd';
import _ from 'lodash';

export default class MultiFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      keys: [],
      checkedList: []
    };
  }

  isFilterActive = () => {
    const { query } = this.state;

    return query !== '';
  };

  doesFilterPass = params => {
    const { query } = this.state;

    if (query === '') {
      return true;
    } else {
      return query.includes(this.props.valueGetter(params.node));
    }
  };

  onChange = values => {
    const { query } = this.state;

    if (query !== values) {
      const payload = values.length > 0 ? values : '';
      this.setState(
        {
          query: payload,
          checkedList: values
        },
        () => {
          this.props.filterChangedCallback();
        }
      );
    }
  };

  setModel(model) {
    this.onChange([]);
  }

  componentDidMount() {
    const { colDef, agGridReact } = this.props;

    this.setState({
      keys: _.uniq(_.map(agGridReact.props.rowData, colDef.field)).sort()
    });
  }

  render() {
    const { keys } = this.state;
    const { colDef, column } = this.props;
    const t = column?.userProvidedColDef?.filterParams?.t;
    // console.log('.............................multi.jsx', this.props);
    return (
      <div className="multi-select-tab">
        <div className="filter-header">{t('fields.filterBy')} {colDef.headerName}</div>
        <Divider style={{ marginTop: 10, marginBottom: 7 }} />
        <div className="filter-checkbox">
          <Checkbox.Group
            options={keys}
            value={this.state.checkedList}
            onChange={this.onChange}
          ></Checkbox.Group>
        </div>
      </div>
    );
  }
}
