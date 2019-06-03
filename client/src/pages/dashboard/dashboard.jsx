import React, { Component } from "react";
import auth from "../../utils/auth";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Page from "../../components/page";
import "./dashboard.css";

const data = [
  {
    id: 1,
    name: "test",
    price: 10
  },
  {
    id: 2,
    name: "test",
    price: 10
  },
  {
    id: 3,
    name: "test",
    price: 10
  },
  {
    id: 4,
    name: "test",
    price: 10
  },
  {
    id: 5,
    name: "test",
    price: 10
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false
    };
  }

  render() {
    const cellEditProp = {
      mode: "click"
    };

    return (
      <Page page={"Dashboard"} isLoading={false}>
        <BootstrapTable data={data} keyBoardNav cellEdit={cellEditProp}>
          <TableHeaderColumn dataField="id" isKey={true}>
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
        </BootstrapTable>
      </Page>
    );
  }
}

export default auth(Dashboard);
