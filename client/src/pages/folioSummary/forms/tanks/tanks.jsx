import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Download } from "../../../../components";
import { Button } from "antd";

export default class Tanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.data
    };
  }

  render() {
    const { values } = this.state;

    const edit = {
      mode: "click"
    };

    const select = {
      mode: "checkbox",
      clickToSelect: true,
      columnWidth: "50px"
    };

    return (
      <div>
        <Button shape="round" type="primary" icon="edit" style={{ marginBottom: 15, marginRight: 5 }}>
          Update Tanks
        </Button>
        <Download data={values} type={"folio_msummary_tanks"} style={{ marginRight: 5 }} />
        <Button shape="round" type="primary" icon="calculator" style={{ marginBottom: 15, marginRight: 5, float: "right" }}>
          Calculate
        </Button>

        <BootstrapTable data={values} keyBoardNav cellEdit={edit} selectRow={select} maxHeight="600px">
          <TableHeaderColumn dataField="tank_code" isKey={true}>
            Tank Code
          </TableHeaderColumn>
          <TableHeaderColumn dataField="tank_base">Prod. Code</TableHeaderColumn>
          <TableHeaderColumn dataField="base_name">Prod. Name</TableHeaderColumn>
          <TableHeaderColumn dataField="bclass_desc">Class</TableHeaderColumn>
          <TableHeaderColumn dataField="close_std_tot">Closing Ambient (L)</TableHeaderColumn>
          <TableHeaderColumn dataField="close_std_tot">Closing Corrected (L)</TableHeaderColumn>
          <TableHeaderColumn dataField="close_mass_tot">Closing Mass (kg)</TableHeaderColumn>
          <TableHeaderColumn dataField="close_temp">Closing Temp (C)</TableHeaderColumn>
          <TableHeaderColumn dataField="close_density">Closing Density (km/m3)</TableHeaderColumn>
          <TableHeaderColumn dataField="description">Gain / Loss Reason</TableHeaderColumn>
          <TableHeaderColumn dataField="user_code">Last Modified By</TableHeaderColumn>
          <TableHeaderColumn dataField="last_chg_time">Last Modified</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
