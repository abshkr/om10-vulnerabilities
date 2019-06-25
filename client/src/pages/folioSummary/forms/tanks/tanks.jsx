import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Download } from "../../../../components";
import { Button } from "antd";

export default class Tanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.data,
      isCalculating: false
    };
  }

  render() {
    const { values, isCalculating } = this.state;

    const edit = {
      mode: "click"
    };

    return (
      <div>
        <Button shape="round" type="primary" icon="edit" style={{ marginBottom: 15, marginRight: 5 }} loading={isCalculating}>
          Update Tanks
        </Button>
        <Download data={values} type={"folio_msummary_tanks"} style={{ marginRight: 5 }} />
        <Button shape="round" type="primary" icon="calculator" style={{ marginBottom: 15, marginRight: 5, float: "right" }} loading={isCalculating}>
          Calculate
        </Button>

        <BootstrapTable data={values} keyBoardNav cellEdit={edit} maxHeight="600px">
          <TableHeaderColumn dataField="tank_code" isKey={true}>
            Tank Code
          </TableHeaderColumn>
          <TableHeaderColumn dataField="tank_base" editable={false}>
            Prod. Code
          </TableHeaderColumn>
          <TableHeaderColumn dataField="base_name" editable={false}>
            Prod. Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="bclass_desc" editable={false}>
            Class
          </TableHeaderColumn>
          <TableHeaderColumn dataField="close_std_tot">Closing Ambient (L)</TableHeaderColumn>
          <TableHeaderColumn dataField="close_std_tot">Closing Corrected (L)</TableHeaderColumn>
          <TableHeaderColumn dataField="close_mass_tot">Closing Mass (kg)</TableHeaderColumn>
          <TableHeaderColumn dataField="close_temp">Closing Temp (C)</TableHeaderColumn>
          <TableHeaderColumn dataField="close_density">Closing Density (km/m3)</TableHeaderColumn>
          <TableHeaderColumn dataField="description">Gain / Loss Reason</TableHeaderColumn>
          <TableHeaderColumn dataField="user_code" editable={false}>
            Last Modified By
          </TableHeaderColumn>
          <TableHeaderColumn dataField="last_chg_time" editable={false}>
            Last Modified
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
