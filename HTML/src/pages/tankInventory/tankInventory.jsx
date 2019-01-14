import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import axios from "axios";
import { Table } from "antd";
import columns from "./columns";
import "./tankInventory.css";

class TankInventory extends Component {
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
    axios.get(`https://10.1.10.66/api/tank_inv/read.php`).then(res => {
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
      <Page page={"Stock Management"} name={"Tank Inventory"} isLoading={isLoading} block={true}>
        <Table
          rowKey="metercode"
          dataSource={data}
          columns={columns(sortedInfo || {}, filteredInfo || {}, data)}
          onChange={this.handleChange}
          size="small"
        />
      </Page>
    );
  }
}

export default auth(TankInventory);
