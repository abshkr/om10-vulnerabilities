import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default class Tanks extends Component {
  render() {
    const { data } = this.props;

    return (
      <BootstrapTable
        data={data}
        keyBoardNav
        cellEdit={{
          mode: "click"
        }}
        maxHeight="600px"
      >
        <TableHeaderColumn dataField="id" isKey={true}>
          Tank Code
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name">Prod. Code</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Prod. Name</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Class</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Closing Ambient (L)</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Closing Corrected (L)</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Closing Mass (kg)</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Closing Temp (C)</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Closing Density (km/m3)</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Gain / Loss Reason</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Last Modified By</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Last Modified</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
