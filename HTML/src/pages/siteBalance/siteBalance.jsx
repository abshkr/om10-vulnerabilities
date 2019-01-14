import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import axios from "axios";
import Filters from "./filters";

import { Table } from "antd";
import columns from "./columns";
import "./siteBalance.css";

class SiteBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      filteredInfo: null,
      sortedInfo: null,
      isLoading: true
    };
  }

  fetchData = () => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.66/api/site_bal/read.php?unit=US.GAL`).then(res => {
      this.setState({ data: res.data.records, isLoading: false });
    });
  };

  setVolume = volume => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.66/api/site_bal/read.php?unit=${volume}`).then(res => {
      this.setState({ data: res.data.records, isLoading: false });
    });
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { isLoading, data, sortedInfo, filteredInfo } = this.state;
    return (
      <Page page={"Stock Management"} name={"Site Balance"} isLoading={isLoading} block={true}>
        <Filters setVolume={this.setVolume} />
        <Table
          rowKey="tankcode"
          dataSource={data}
          columns={columns(sortedInfo || {}, filteredInfo || {})}
          onChange={this.handleChange}
          size="small"
        />
      </Page>
    );
  }
}

export default auth(SiteBalance);
