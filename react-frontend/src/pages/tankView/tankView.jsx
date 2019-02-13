/**
 * @description
 * Tank View Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import axios from "axios";
import Page from "../../components/page";
import DataTable from "../../components/table";
import { Progress, Badge, Button, Tabs } from "antd";
import "./tankView.css";

const status = {
  "In Service - Not used": "#c1c1c1",
  "In Service – Receiving": "#6e68ec",
  "In Service - Settling": "#ecb068",
  "In Service – Loading": "#a4ec68",
  "In Service – Working": "#e6ec68",
  "Out of Service (Offline)": "#68a4ec"
};

class TankView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tanks: null
    };
  }

  fetchTanks = () => {
    axios.get(`https://10.1.10.66/api/tank/read.php`).then(response => {
      const data = response.data.records;
      this.setState({
        tanks: data
      });
    });
  };

  componentDidMount() {
    this.fetchTanks();
  }

  render() {
    const name = "Tank View";
    const { tanks } = this.state;
    const TabPane = Tabs.TabPane;
    // border: 1px solid #538aef4b;
    return (
      <Page page={"Operations"} name={name} isLoading={false}>
        <Tabs defaultActiveKey="1" style={{ marginLeft: 55, marginRight: 55 }}>
          <TabPane tab="Tank View" key="1">
            <div className="tank-filter">
              <div style={{ float: "right" }}>
                <Button type="primary" style={{ marginRight: 5 }}>
                  Add Tank
                </Button>
                <Button type="primary">Export Data</Button>
              </div>
            </div>
            <div className="tank-view">
              {!!tanks &&
                tanks.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ border: "1px solid " + status[item.tank_status_name] }}
                      className="tank"
                      disabled
                    >
                      <div className="titles">
                        <span> Name: {item.tank_name} </span>
                        <span> Base Product: {item.tank_base_name} </span>
                      </div>

                      <div className="tank-body">
                        <Progress
                          type="dashboard"
                          percent={
                            Math.round((item.tank_cor_vol / item.tank_ullage) * 100, 2) < 100
                              ? Math.round((item.tank_cor_vol / item.tank_ullage) * 100, 2)
                              : 100
                          }
                          strokeColor="#fff"
                          width={180}
                        />

                        <div className="tank-status">
                          <Badge status="default" text="HH" />
                          <Badge status="processing" text="H" />
                          <Badge status="default" text="L" />
                          <Badge status="default" text="LL" />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabPane>
          <TabPane tab="Table View" key="2">
            <DataTable rowKey="base_code" loading={true} scroll={3600} click={this.showEdit} />
          </TabPane>
        </Tabs>
      </Page>
    );
  }
}

export default auth(TankView);
