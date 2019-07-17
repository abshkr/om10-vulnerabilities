import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, notification, message } from "antd";
import columns from "./columns";
import { folioSummary } from "../../../../api";
import { DataTable } from "../../../../components";

export default class Reports extends Component {
  state = {
    isLoading: false
  };

  handleDataModel = data => {
    const payload = [];
    _.forEach(data, (value, index) => {
      payload.push({
        index,
        value
      });
    });
    return payload;
  };

  handleRegenerate = id => {
    message.loading("A request to regenerate the report has been sent. It may take a few minutes before completion.");

    this.setState({ isLoading: true });

    axios.all([folioSummary.regenerateReports(id)]).then(
      axios.spread(reports => {
        this.setState({
          isGenerating: false
        });

        notification.success({
          message: "Successfully Regenerated."
        });

        this.props.refresh();
      })
    );
  };

  render() {
    const { isLoading } = this.state;
    const { data, id } = this.props;
    return (
      <div>
        <Button shape="round" type="primary" icon="reload" style={{ marginBottom: 15 }} loading={isLoading} onClick={() => this.handleRegenerate(id)}>
          {isLoading ? "Regenerating..." : "Regenerate"}
        </Button>
        <DataTable isLoading={false} rowKey="value" columns={columns(id)} data={this.handleDataModel(data)} />
      </div>
    );
  }
}
