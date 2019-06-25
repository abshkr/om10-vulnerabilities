import React, { Component } from "react";
import { Form } from "antd";
import { notification } from "antd";
import generate from "./generate";
import moment from "moment";
import _ from "lodash";

import SupplierForm from "./Items/supplier.jsx";
import ReportsForm from "./Items/report.jsx";
import CustomerForm from "./Items/customers.jsx";
import CarrierForm from "./Items/carrier.jsx";
import DateForm from "./Items/date.jsx";
import DateRangeForm from "./Items/date-range.jsx";
import CloseOutForm from "./Items/close-out.jsx";
import CloseOutRangeForm from "./Items/close-out-range.jsx";
import OutputForm from "./Items/output.jsx";
import SubmitForm from "./Items/submit.jsx";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 0,
      generating: false
    };
  }

  isGenerating = value => {
    if (value !== "error") {
      this.setState({ generating: value });

      notification.success({
        message: "Report Generated Succesfully!"
      });
    } else if (value === "error") {
      this.setState({ generating: false });

      notification.error({
        message: "Creating the report failed.",
        description: "Please validate your parameters."
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ generating: true });
        generate(values, this.isGenerating, this.props.token);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  supplierChange = value => {
    this.props.getReports(value);
    this.props.form.resetFields("report");
  };

  findCloseOutRange = data => {
    const max = _.maxBy(data, function(o) {
      return o.closeout_nr;
    });

    this.setState({ max: max.closeout_nr });
  };

  formatter = value => {
    const data = this.props.closeOut;
    const payload = _.find(data, function(object) {
      return object.closeout_nr === value;
    });
    const start = moment(payload.start_date, "YYYY-MM-DD hh-mm-ss-SSS").format("D-M-YY");
    const end = moment(payload.end_date, "YYYY-MM-DD hh-mm-ss-SSS").format("D-M-YY");
    const returnString = `Id: ${value}
                          | From: ${end}
                          → ${start}`;
    return returnString;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.closeOut !== this.props.closeOut) {
      this.findCloseOutRange(this.props.closeOut);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { min, max, generating } = this.state;
    const { supplier, reports, validator, customers, carriers, filter, loading } = this.props;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <SupplierForm decorator={getFieldDecorator} supplier={supplier} change={this.supplierChange} />

        <ReportsForm
          reports={reports}
          loading={loading}
          validator={validator}
          decorator={getFieldDecorator}
          getFilter={this.props.getFilter}
        />

        <CustomerForm decorator={getFieldDecorator} filter={filter} customers={customers} />
        <CarrierForm decorator={getFieldDecorator} filter={filter} carriers={carriers} />
        <DateForm decorator={getFieldDecorator} filter={filter} />
        <DateRangeForm decorator={getFieldDecorator} filter={filter} />

        <CloseOutForm
          decorator={getFieldDecorator}
          filter={filter}
          formatter={this.formatter}
          min={min}
          max={max}
        />

        <CloseOutRangeForm
          decorator={getFieldDecorator}
          filter={filter}
          formatter={this.formatter}
          min={min}
          max={max}
        />
        <OutputForm decorator={getFieldDecorator} />
        <SubmitForm generating={generating} handleReset={this.handleReset} />
      </Form>
    );
  }
}

const ReportForm = Form.create()(RegistrationForm);

export default ReportForm;
