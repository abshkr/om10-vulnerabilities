import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import DataTable from "./dataTable";
import "./customerCategories.css";

class CustomerCategories extends Component {
  render() {
    return (
      <Page page={"Customers"} name={"Customers Categories"} isLoading={false} block={true}>
        <DataTable />
      </Page>
    );
  }
}

export default auth(CustomerCategories);
