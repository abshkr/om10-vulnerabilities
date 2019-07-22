import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Download } from "../../../../components";
import { folioSummary } from "../../../../api";
import axios from "axios";
import { Button, Modal, notification } from "antd";
import _ from "lodash";

export default class Tanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.data,
      isLoading: false
    };
  }

  handleRowEdit = (object, key) => {
    const { values } = this.state;
    const change = object[key];

    if (key === "close_amb_tot") {
      object["frm_which_type"] = "LT";
    }

    if (key === "close_std_tot") {
      object["frm_which_type"] = "L15";
    }

    if (key === "close_mass_tot") {
      object["frm_which_type"] = "KG";
    }

    if (key === "description") {
      object[key] = change;
    } else {
      object[key] = _.toInteger(change);
    }

    this.setState({
      values: _.map(values, value => {
        return value.tank_code === object.tank_code ? object : value;
      })
    });
  };

  handleValidation = (row, cellName, cellValue) => {
    const { values } = this.state;

    const value = _.find(values, value => {
      return value.tank_code === row.tank_code;
    });

    if (cellName !== "description") {
      cellValue = _.toInteger(cellValue);
    }

    return value[cellName] !== cellValue;
  };

  handleCalculation = values => {
    this.setState({ isLoading: true });

    axios.all([folioSummary.calculateTanks(values)]).then(
      axios.spread(data => {
        if (data.data.calc_issues > 0) {
          _.forEach(data.data.desc, value => {
            const args = {
              message: "Error While Calculating",
              description: value
            };
            notification.error(args);
          });
        }

        this.setState({
          isLoading: false,
          values: data.data.data
        });
      })
    );
  };

  handleSubmit = values => {
    this.setState({ isLoading: true });

    axios.all([folioSummary.updateTank(values)]).then(
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
      afterSaveCell: this.handleRowEdit
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
          Update Tanks
        </Button>
        <Download data={values} type={"folio_msummary_tanks"} style={{ marginRight: 5 }} />
        <Button
          shape="round"
          type="primary"
          icon="calculator"
          style={{ marginBottom: 15, marginRight: 5, float: "right" }}
          loading={isLoading}
          onClick={() => this.handleCalculation(values)}
          disabled={status === 2}
        >
          Calculate
        </Button>

        <BootstrapTable keyBoardNav data={values} cellEdit={edit} maxHeight="600px">
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
          <TableHeaderColumn dataField="close_amb_tot" editable={status !== 2}>
            Closing Ambient (L)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="close_std_tot" editable={status !== 2}>
            Closing Corrected (L)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="close_mass_tot" editable={status !== 2}>
            Closing Mass (kg)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="close_temp" editable={status !== 2}>
            Closing Temp (C)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="close_density" editable={status !== 2}>
            Closing Density (km/m3)
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" editable={status !== 2}>
            Gain / Loss Reason
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
