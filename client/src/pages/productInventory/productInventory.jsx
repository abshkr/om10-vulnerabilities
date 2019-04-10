import React, { Component } from "react";
import auth from "../../utils/auth";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import search from "../../utils/search";
import axios from "axios";
import columns from "./columns";

import "./productInventory.css";

class ProductInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      value: ""
    };
  }

  getProductInventory = () => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.66/api/prod_inv/read.php?unit=US.GAL`).then(res => {
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
    this.getProductInventory();
  }

  render() {
    const { isLoading, data, value, filtered } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <div>
        <Page page={"Stock Management"} name={"Product Inventory"} isLoading={isLoading} block={true}>
          <Container>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <Filter value={value} search={this.searchObjects} />
                <Download data={data} type={"Metering"} />
              </div>
            </div>

            <DataTable
              rowKey="base_code"
              columns={columns(results)}
              data={results}
              loading={true}
              scroll={300}
              click={this.showEdit}
            />
          </Container>
        </Page>
      </div>
    );
  }
}

export default auth(ProductInventory);
