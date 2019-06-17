import React, { Component } from "react";
import { Tabs, Spin } from "antd";
import Tanks from "./tanks";
import Meters from "./meters";
import Reports from "./reports";
import axios from "axios";
import { folioSummary } from "../../../api";

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tanks: [],
      meters: [],
      isLoading: true
    };
  }

  getReadings = () => {
    this.setState({
      isLoading: true
    });

    const { payload } = this.props;
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
    this.getReadings();
  }

  render() {
    const TabPane = Tabs.TabPane;
    const { tanks, meters, isLoading, reports } = this.state;

    return (
      <Spin spinning={isLoading} style={{ minHeight: "720px" }}>
        <Tabs defaultActiveKey="1" style={{ height: "720px" }}>
          <TabPane tab="Reports" key="1">
            <Reports id={this.props.payload.closeout_nr} data={reports} />
          </TabPane>
          <TabPane tab="Meters" key="2">
            {!isLoading && <Meters data={meters} update={this.getReadings} />}
          </TabPane>
          <TabPane tab="Tanks" key="3">
            {!isLoading && <Tanks data={tanks} update={this.getReadings} />}
          </TabPane>
        </Tabs>
      </Spin>
    );
  }
}
