import React, { Component } from 'react';
import { Checkbox, Divider } from 'antd';
import _ from 'lodash';

export default class MultiFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      keys: [],
      checkedList: [],
    };
  }

  isFilterActive = () => {
    // not sure why need to do this one but it seems necessary to trigger the render function
    // maybe any changes to the state will trigger the render function
    this.setState({
      keys: [],
    });

    const { query } = this.state;

    return query !== '';
  };

  doesFilterPass = (params) => {
    const { query } = this.state;

    if (query === '') {
      return true;
    } else {
      return query.includes(this.props.valueGetter(params.node));
    }
  };

  onChange = (values) => {
    const { query } = this.state;

    if (query !== values) {
      const payload = values.length > 0 ? values : '';
      this.setState(
        {
          query: payload,
          checkedList: values,
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
    // For unknown reason, agGridReact.props.rowData never changes.
    // This part becomes redundant after the fix, but we will keep it for now
    const { colDef, agGridReact } = this.props;

    this.setState({
      keys: _.uniq(_.map(agGridReact.props.rowData, colDef.field)).sort(),
    });
  }

  render() {
    // const { keys } = this.state;
    const { colDef, column, api } = this.props;
    // use api.forEachNode to get the latest row data and work out the keys for multi filter
    const items = [];
    api.forEachNode((rowNode, index) => {
      items.push(rowNode?.data?.[colDef.field]);
    });
    const keys = _.uniq(items).sort();
    // console.log('............multi.jsx', items,);

    const t = column?.userProvidedColDef?.filterParams?.t;

    return (
      <div className="multi-select-tab">
        <div className="filter-header">
          {t('fields.filterBy')} {colDef.headerName}
        </div>
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
