/**
 * @description
 * Base Products Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import Filter from "../../components/filter";
import DataTable from "../../components/table";
import Download from "../../components/download";
import { CreateButton } from "../../components/buttons";
import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";
import { Create } from "./forms/create";

class BaseProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      create: false,
      edit: false
    };
  }

  fetchBaseProducts = () => {
    axios.get(`https://10.1.10.66/api/base_prod/read.php`).then(response => {
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

  componentDidMount() {
    this.fetchBaseProducts();
  }

  render() {
    const { data, isLoading, filtered, value, create } = this.state;
    const results = !!filtered ? filtered : data;
    const name = "Base Products";
    return (
      <Page page={"Gantry"} name={name} isLoading={isLoading} block={true}>
        <Filter value={value} search={this.searchObjects} />
        <Download data={data} type={name} style={{ float: "right" }} />
        <CreateButton type={name} style={{ float: "right", marginRight: 5 }} action={this.showCreate} />
        <Create visible={create} cancel={this.hideCreate} />
        <DataTable
          rowKey="base_code"
          columns={columns(results)}
          data={results}
          loading={true}
          scroll={3600}
        />
      </Page>
    );
  }
}

export default auth(BaseProducts);
