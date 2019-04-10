import React, { Component } from "react";
import auth from "../../utils/auth";
import axios from "axios";
import { Page, Download, Container, DataTable, Filter } from "../../components";
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
    axios.get(`https://10.1.10.66/api/pages/tank_inv/read.php`).then(res => {
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
        <Container>
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
        </Container>
      </Page>
    );
  }
}

export default auth(TankInventory);
