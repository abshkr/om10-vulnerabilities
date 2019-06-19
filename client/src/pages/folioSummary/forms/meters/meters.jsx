import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Download } from "../../../../components";
import { Button, message } from "antd";
import _ from "lodash";

export default class Meters extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      values: data
    };
  }

  handleRowEdit = object => {
    const values = this.state.values.map(item => (item.meter_code === object.id ? _.toInteger(object) : item));
    this.setState({
      values
    });
  };

  onBeforeSaveCell = (row, cellName, cellValue) => {
    if (!isNaN(cellValue)) {
      return true;
    } else {
      message.warn("Value Must be an Integer.");
      return false;
    }
  };

  handleCaculate = values => {
    console.log(values);
    this.setState({
      values
    });
  };

  render() {
    const { values } = this.state;

    const edit = {
      mode: "click",
      beforeSaveCell: this.onBeforeSaveCell,
      afterSaveCell: this.handleRowEdit
    };

    return (
      <div>
        <Button shape="round" type="primary" icon="edit" style={{ marginBottom: 15, marginRight: 5 }} onClick={() => console.log(values)}>
          Update Meters
        </Button>
        <Download data={values} type={"folio_summary_meters"} style={{ marginRight: 5 }} />
        <Button shape="round" type="primary" icon="calculator" style={{ marginBottom: 15, marginRight: 5, float: "right" }} onClick={() => this.handleCaculate(values)}>
          Calculate
        </Button>
        <BootstrapTable data={values} keyBoardNav cellEdit={edit} maxHeight="600px">
          <TableHeaderColumn
            dataField="meter_code"
            isKey={true}
            editable={{
              type: ""
            }}
          >
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
      </div>
    );
  }
}
