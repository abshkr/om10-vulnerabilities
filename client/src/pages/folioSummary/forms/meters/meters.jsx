import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Download } from "../../../../components";
import { Button } from "antd";

export default class Meters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.data
    };
  }

  handleRowEdit = object => {
    let { values } = this.state;
    this.setState({
      values: values.map(item => (item.meter_code === object.id ? object : item))
    });
  };

  handleCaculate = values => {
    this.setState({
      values
    });
  };

  render() {
    const { values } = this.state;

    const edit = {
      mode: "click",
      afterSaveCell: this.handleRowEdit
    };

    const select = {
      mode: "checkbox",
      clickToSelect: true,
      columnWidth: "50px"
    };

    return (
      <div>
        <Button shape="round" type="primary" icon="edit" style={{ marginBottom: 15, marginRight: 5 }} onClick={() => console.log(values)}>
          Update Meters
        </Button>
        <Download data={values} type={"folio_msummary_meters"} style={{ marginRight: 5 }} />
        <Button shape="round" type="primary" icon="calculator" style={{ marginBottom: 15, marginRight: 5, float: "right" }} onClick={() => this.handleCaculate(values)}>
          Calculate
        </Button>
        <BootstrapTable data={values} keyBoardNav cellEdit={edit} selectRow={select} maxHeight="600px">
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
      </div>
    );
  }
}
