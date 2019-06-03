import React, { Component } from "react";
import { Tabs } from "antd";
import Tanks from "./tanks";
import Meters from "./meters";
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
    axios.all([folioSummary.readFolioMeters(payload.closeout_nr), folioSummary.readFolioTanks(payload.closeout_nr)]).then(
      axios.spread((meters, tanks) => {
        this.setState({
          isLoading: false,
          tanks: tanks.data.records,
          meters: meters.data.records
        });
      })
    );
  };

  componentDidMount() {
    this.getReadings();
  }

  render() {
    const TabPane = Tabs.TabPane;
    const { tanks, meters } = this.state;

    return (
      <Tabs defaultActiveKey="1" style={{ height: "670px" }}>
        <TabPane tab="Meters" key="1">
          <Meters data={meters} />
        </TabPane>
        <TabPane tab="Tanks" key="2">
          <Tanks data={tanks} />
        </TabPane>
      </Tabs>
    );
  }
}
