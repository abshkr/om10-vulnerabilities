/**
 * @description
 * Tank View Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import axios from "axios";
import { Page, DataTable, Container } from "../../components";
import { Badge, Button, Tabs, Modal } from "antd";
import { WaterWave } from "ant-design-pro/lib/Charts";

import columns from "./columns";
import _ from "lodash";

import "./tankView.css";

const Panel = Tabs.TabPane;

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
      tanks: null,
      data: null
    };
  }

  openModal = tank => {
    Modal.info({
      title: tank.tank_name,
      centered: true,
      width: 640,
      maskClosable: true,
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      )
    });
  };

  getTanks = () => {
    axios.get(`https://10.1.10.66/api/tank/read.php`).then(response => {
      const data = response.data.records;
      this.setState({
        tanks: data,
        data: this.modelTanks(data)
      });
    });
  };

  modelTanks = data => {
    let values = [];

    _(data)
      .groupBy(object => object.tank_bclass_name)
      .map((value, key) =>
        values.push({
          base_name: key,
          tank_count: value.length,
          total_capacity: 0,
          observed_quantity: 0,
          total_ullage: _.sumBy(value, function(o) {
            return parseInt(o.tank_ullage);
          }),
          total_fill: 0
        })
      )
      .value();

    return values;
  };

  componentDidMount() {
    this.getTanks();
  }

  render() {
    const { tanks, data } = this.state;

    return (
      <Page page="Operations" name="Tank View" isLoading={false} block>
        <Container>
          <Tabs defaultActiveKey="1" style={{ marginLeft: 55, marginRight: 55 }}>
            <Panel tab="Tank View" key="1">
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
                      <div key={index} className="tank" disabled onClick={() => this.openModal(item)}>
                        <div className="titles">
                          <span> {item.tank_name} </span>
                        </div>

                        <div className="tank-body">
                          <WaterWave
                            color={status[item.tank_status_name]}
                            height={180}
                            title={item.tank_base_name}
                            percent={
                              Math.round((item.tank_cor_vol / item.tank_ullage) * 100, 2) < 100
                                ? Math.round((item.tank_cor_vol / item.tank_ullage) * 100, 2)
                                : 100
                            }
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
            </Panel>
            <Panel tab="Table View" key="2">
              <div className="tank-filter" style={{ marginBottom: 20 }}>
                <div style={{ float: "right" }}>
                  <Button type="primary" style={{ marginRight: 5 }}>
                    Add Tank
                  </Button>
                  <Button type="primary">Export Data</Button>
                </div>
              </div>
              <DataTable
                rowKey="base_name"
                columns={columns}
                data={data}
                loading={true}
                scroll={900}
                click={this.showEdit}
              />
            </Panel>
          </Tabs>
        </Container>
      </Page>
    );
  }
}

export default auth(TankView);
