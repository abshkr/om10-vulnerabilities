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
import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";

class BaseProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: []
    };
  }

  fetchBaseProducts = () => {
    axios.get(`https://10.1.10.66/api/idassignment/read.php`).then(response => {
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

  componentDidMount() {
    this.fetchBaseProducts();
  }

  render() {
    const { data, isLoading, filtered, value } = this.state;
    const results = !!filtered ? filtered : data;

    return (
      <Page page={"Gantry"} name={"Base Products"} isLoading={isLoading} block={true}>
        <Filter value={value} search={this.searchObjects} />
        <DataTable rowKey="kya_key_no" columns={columns(results)} data={results} loading={true} />
      </Page>
    );
  }
}

export default auth(BaseProducts);
