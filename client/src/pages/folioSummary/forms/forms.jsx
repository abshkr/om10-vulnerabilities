import React, { Component } from "react";
import { Tabs, Spin } from "antd";
import Tanks from "./tanks";
import Meters from "./meters";
import Reports from "./reports";
import axios from "axios";
import { folioSummary } from "../../../api";

const TabPane = Tabs.TabPane;

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tanks: [],
      meters: [],
      isLoading: true
    };
  }

  handleFetch = () => {
    const { payload } = this.props;

    this.setState({
      isLoading: true
    });

    axios.all([folioSummary.readFolioMeters(payload.closeout_nr), folioSummary.readFolioTanks(payload.closeout_nr), folioSummary.readFolioReports(payload.closeout_nr)]).then(
      axios.spread((meters, tanks, reports) => {
        this.setState({
          isLoading: false,
          tanks: tanks.data.records,
          meters: meters.data.records,
          reports: reports.data.records
        });
      })
    );
  };

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    const { tanks, meters, isLoading, reports } = this.state;
    const { payload, refresh } = this.props;
    return (
      <Spin spinning={isLoading} style={{ minHeight: "85vh" }}>
        <Tabs defaultActiveKey="1" style={{ height: "75vh" }}>
          <TabPane tab="Reports" key="1">
            <Reports id={payload.closeout_nr} status={payload.status} data={reports} refresh={this.handleFetch} />
          </TabPane>
          <TabPane tab="Meters" key="2">
            {!isLoading && <Meters status={payload.status} data={meters} update={this.getReadings} refresh={refresh} />}
          </TabPane>
          <TabPane tab="Tanks" key="3">
            {!isLoading && <Tanks status={payload.status} data={tanks} update={this.getReadings} refresh={refresh} />}
          </TabPane>
        </Tabs>
      </Spin>
    );
  }
}
