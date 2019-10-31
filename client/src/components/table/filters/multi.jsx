import React, { Component } from 'react';
import { Checkbox, Divider } from 'antd';
import _ from 'lodash';

export default class MultiFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      keys: [],
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
        },
        () => {
          this.props.filterChangedCallback();
        },
      );
    }
  };

  componentDidMount() {
    const { colDef, agGridReact } = this.props;

    this.setState({
      keys: _.uniq(_.map(agGridReact.props.rowData, colDef.field)),
    });
  }

  render() {
    const { keys } = this.state;
    const { colDef } = this.props;

    return (
      <div className="multi-select-tab">
        <div className="filter-header">Filter By {colDef.headerName}</div>
        <Divider style={{ marginTop: 10, marginBottom: 7 }} />
        <div className="filter-checkbox">
          <Checkbox.Group options={keys} onChange={this.onChange}></Checkbox.Group>
        </div>
      </div>
    );
  }
}
