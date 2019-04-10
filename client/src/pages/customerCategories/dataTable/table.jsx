import React, { Component } from "react";
import { Table } from "antd";
import axios from "axios";

import Create from "./create";
import Update from "./update";

import columns from "./columns";

export default class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      filteredInfo: null,
      sortedInfo: null,
      selected: null,
      visible: false
    };
  }

  fetchData = () => {
    axios.get(`https://10.1.10.66/api/pages/cust_cat/read.php`).then(res => {
      this.setState({ data: res.data.records });
    });
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clickRow = selected => {
    this.setState({ selected, visible: true });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { data, sortedInfo, filteredInfo, visible, selected } = this.state;

    return (
      <div>
        <Create update={this.fetchData} />
        {!!selected && <Update onClose={this.onClose} visible={visible} selected={selected} />}
        <Table
          rowKey="category_code"
          dataSource={data}
          columns={columns(sortedInfo || {}, filteredInfo || {})}
          onChange={this.handleChange}
          size="small"
          onRow={record => {
            return {
              onClick: () => {
                this.clickRow(record);
              }
            };
          }}
        />
      </div>
    );
  }
}
