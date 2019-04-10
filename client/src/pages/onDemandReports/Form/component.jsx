import React, { Component } from "react";
import ReportForm from "./form";
import axios from "axios";
import _ from "lodash";
import * as API from "../../../constants/api";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      date: false,
      token: null,
      loading: "",
      reports: [],
      supplier: false,
      carriers: false,
      closeOut: false,
      customers: false,
      validator: {
        report: "",
        date1: null,
        carrier: "",
        closeOut: [],
        customer: "",
        supplier: "",
        output: "csv"
      }
    };
  }

  fetchInitial = token => {
    axios
      .all([
        axios.get(`https://${API.URL}/api/on_demand/carriers.php`, {
          headers: { Authorization: `Bearer ${token.access_token}` }
        }),
        axios.get(`https://${API.URL}/api/on_demand/customers.php`, {
          headers: { Authorization: `Bearer ${token.access_token}` }
        }),
        axios.get(`https://${API.URL}/api/on_demand/suppliers.php`, {
          headers: { Authorization: `Bearer ${token.access_token}` }
        }),
        axios.get(`https://${API.URL}/api/on_demand/closeout_nrs.php`, {
          headers: { Authorization: `Bearer ${token.access_token}` }
        })
      ])
      .then(
        axios.spread((carriers, customers, suppliers, closeOut) => {
          this.setState({
            supplier: suppliers.data.records,
            customers: customers.data.records,
            carriers: carriers.data.records,
            closeOut: closeOut.data.records
          });
        })
      )
      .catch(error => console.log(error));
  };

  getReports = code => {
    const { token } = this.state;
    this.setState({ reports: false, loading: "validating", filter: [] });
    axios
      .get(`https://${API.URL}/api/on_demand/reports.php?cmpy_code=${code}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      })
      .then(res => {
        this.setState({
          reports: res.data.records,
          loading: "success",
          validator: Object.assign({}, this.state.validator, { report: "", supplier: code })
        });
      });
  };

  getFilter = report => {
    const { reports, token } = this.state;

    this.setState({ loading: "validating" });

    const file = _.find(reports, function(o) {
      return o.rpt_file === report;
    });

    if (!!file) {
      axios
        .get(`https://${API.URL}/api/on_demand/filters.php?jasper_file=${file.jasper_file}`, {
          headers: { Authorization: `Bearer ${token.access_token}` }
        })
        .then(res => {
          this.setState({ loading: "success" });
          if (!!res.data.records) {
            this.setState({ filter: res.data.records });
          }
        });
    }
  };

  componentDidMount() {
    let { auth } = this.props;
    let token;

    try {
      token = JSON.parse(auth);
    } catch (e) {
      token = auth;
    }

    this.setState({ token });
    this.fetchInitial(token);
  }

  render() {
    return <ReportForm {...this.state} getFilter={this.getFilter} getReports={this.getReports} />;
  }
}
