import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import Filters from "./filters";
import axios from "axios";
import { Table } from "antd";
import columns from "./columns";

import "./metering.css";

class Metering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      mass: "kg",
      volume: "litre",
      filteredInfo: null,
      sortedInfo: null,
      isLoading: true
    };
  }

  setVolume = volume => {
    this.setState({ isLoading: true });
    axios
      .get(`https://10.1.10.66/api/metering/read.php?mass_unit=${this.state.mass}&vol_unit=${volume}`)
      .then(res => {
        this.setState({ data: res.data.records, volume, isLoading: false });
      });
  };

  setMass = mass => {
    this.setState({ isLoading: true });
    axios
      .get(`https://10.1.10.66/api/metering/read.php?mass_unit=${mass}&vol_unit=${this.state.volume}`)
      .then(res => {
        this.setState({ data: res.data.records, mass, isLoading: false });
      });
  };

  fetchData = () => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.66/api/metering/read.php?mass_unit=kg&vol_unit=litre`).then(res => {
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
      <Page page={"Stock Management"} name={"Metering"} isLoading={isLoading} block={true}>
        <Filters setVolume={this.setVolume} setMass={this.setMass} />
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

export default auth(Metering);
