import React, { Component } from "react";
import auth from "../../auth";
import axios from "axios";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import { stockManagement } from "../../api";
import search from "../../utils/search";
import columns from "./columns";
import "./tankInventory.css";

class TankInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      value: ""
    };
  }

  fetchTankInventory = () => {
    this.setState({ isLoading: true });
    axios.all([stockManagement.readTankInventory()]).then(
      axios.spread(metering => {
        this.setState({
          isLoading: false,
          data: metering.data.records
        });
      })
    );
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  componentDidMount() {
    this.fetchTankInventory();
  }

  render() {
    const { isLoading, data, filtered, value } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Stock Management"} name={"Tank Inventory"} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Download data={data} type={"Tank Inventory"} style={{ float: "right" }} />
          <DataTable rowKey="tank_code" columns={columns(results)} data={results} isLoading={isLoading} scroll={100} />
        </Container>
      </Page>
    );
  }
}

export default auth(TankInventory);
