import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import Container from "../../components/container";
import Filter from "../../components/filter";
import DataTable from "../../components/table";
import Download from "../../components/download";
import search from "../../utils/search";
import axios from "axios";

import columns from "./columns";
import "./customerCategories.css";

class CustomerCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      create: false,
      edit: null
    };
  }

  getCustomers = () => {
    axios.get(`https://10.1.10.66/api/cust_cat/read.php`).then(response => {
      const data = response.data.records;
      this.setState({
        data: data,
        isLoading: false
      });
    });
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  showCreate = () => {
    this.setState({ create: true });
  };

  hideCreate = () => {
    this.setState({ create: false });
  };

  showEdit = record => {
    this.setState({ edit: record });
  };

  hideEdit = () => {
    this.setState({ edit: null });
  };

  componentDidMount() {
    this.getCustomers();
  }

  render() {
    const { data, filtered, value } = this.state;
    const results = !!filtered ? filtered : data;
    const name = "Customer Categories";

    return (
      <Page page={"Customers"} name={"Customers Categories"} isLoading={false} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Download data={data} type={name} style={{ float: "right" }} />

          <DataTable
            rowKey="base_code"
            columns={columns(results)}
            data={results}
            loading={true}
            scroll={1000}
            click={this.showEdit}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(CustomerCategories);
