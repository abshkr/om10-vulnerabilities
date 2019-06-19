import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, notification } from "antd";
import columns from "./columns";
import { folioSummary } from "../../../../api";
import { DataTable } from "../../../../components";

export default class Reports extends Component {
  state = {
    isGenerating: false
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
    this.setState({
      isGenerating: true
    });

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
    const { isGenerating } = this.state;
    const { data, id } = this.props;
    return (
      <div>
        <Button shape="round" type="primary" icon="reload" style={{ marginBottom: 15 }} loading={isGenerating} onClick={() => this.handleRegenerate(id)}>
          {isGenerating ? "Regenerating..." : "Regenerate"}
        </Button>
        <DataTable isLoading={false} rowKey="value" columns={columns(id)} data={this.handleDataModel(data)} />
      </div>
    );
  }
}
