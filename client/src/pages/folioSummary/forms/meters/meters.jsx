import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Download } from "../../../../components";
import { Button, message, Modal } from "antd";
import { folioSummary } from "../../../../api";
import axios from "axios";
import _ from "lodash";

export default class Meters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.data,
      isLoading: false
    };
  }

  handleRowEdit = (object, key) => {
    const change = object[key];

    object[key] = _.toInteger(change);

    const values = _.map(this.state.values, value => {
      return value.meter_code === object.meter_code ? object : value;
    });

    this.setState({
      values
    });
  };

  handleValidation = (row, cellName, cellValue) => {
    if (!isNaN(cellValue)) {
      return cellValue !== "";
    } else {
      message.warn("Value Must be an Integer.");
      return false;
    }
  };

  handleSubmit = values => {
    this.setState({ isLoading: true });

    axios.all([folioSummary.updateMeter(values)]).then(
      axios.spread(data => {
        this.setState({
          isLoading: false
        });

        this.props.refresh();
        Modal.destroyAll();
      })
    );
  };

  render() {
    const { values, isLoading } = this.state;
    const { status } = this.props;

    const edit = {
      mode: "click",
      beforeSaveCell: this.handleValidation,
      afterSaveCell: this.handleRowEdit,
      onRowClick: this.onRowClick
    };

    return (
      <div>
        <Button
          shape="round"
          type="primary"
          icon="edit"
          style={{ marginBottom: 15, marginRight: 5 }}
          onClick={() => this.handleSubmit(values)}
          loading={isLoading}
          disabled={status === 2}
        >
          Update Meters
        </Button>

        <Download data={values} type={"folio_summary_meters"} style={{ marginRight: 5 }} loading={isLoading} />

        <BootstrapTable ref="table" data={values} cellEdit={edit} maxHeight="600px">
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

          <TableHeaderColumn dataField="close_amb_tot" editable={status !== 2}>
            Closing Ambient (L)
          </TableHeaderColumn>

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
