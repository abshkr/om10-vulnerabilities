import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default class Meters extends Component {
  render() {
    const { data } = this.props;

    const edit = {
      mode: "click"
    };

    const select = {
      mode: "checkbox",
      clickToSelect: true,
      columnWidth: "50px"
    };

    return (
      <BootstrapTable data={data} keyBoardNav cellEdit={edit} selectRow={select} maxHeight="600px">
        <TableHeaderColumn dataField="meter_code" isKey={true} editable={false}>
          Meter Code
        </TableHeaderColumn>
        <TableHeaderColumn dataField="stream_basecode" editable={false}>
          Product Code
        </TableHeaderColumn>
        <TableHeaderColumn dataField="stream_basename" editable={false}>
          Product Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="close_amb_tot">Closing Ambient (L)</TableHeaderColumn>
        <TableHeaderColumn dataField="close_mass_tot" editable={false}>
          Closing Mass (kg)
        </TableHeaderColumn>
        <TableHeaderColumn dataField="bam_qty_type_str" editable={false}>
          Meter Quantity Type
        </TableHeaderColumn>
        <TableHeaderColumn dataField="user_code" editable={false}>
          Last Modified By
        </TableHeaderColumn>
        <TableHeaderColumn dataField="last_chg_time" editable={false}>
          Last Modified
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
