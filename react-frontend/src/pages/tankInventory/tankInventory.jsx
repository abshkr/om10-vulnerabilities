import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import axios from "axios";
import Filter from "../../components/filter";
import DataTable from "../../components/table";
import Download from "../../components/download";
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
    axios.get(`https://10.1.10.66/api/tank_inv/read.php`).then(res => {
      this.setState({ data: res.data.records, isLoading: false });
    });
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
    const name = "Tank Inventory";
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Stock Management"} name={name} isLoading={isLoading} block={true}>
        <Filter value={value} search={this.searchObjects} />
        <Download data={data} type={name} style={{ float: "right" }} />
        <DataTable
          resize={true}
          rowKey="base_code"
          columns={columns(results)}
          data={results}
          loading={true}
          scroll={100}
        />
      </Page>
    );
  }
}

export default auth(TankInventory);
