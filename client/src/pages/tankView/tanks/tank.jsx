import React, { Component } from "react";
import { Descriptions, Tabs, Badge } from "antd";
import moment from "moment";

export default class Tank extends Component {
  render() {
    const { tank, configuration } = this.props;
    const { defaults } = tank;
    const { TabPane } = Tabs;

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Information" key="1" style={{ height: 610 }}>
          <Descriptions bordered size="small">
            <Descriptions.Item label="Product" span={2}>
              {defaults.tank_base_name}
            </Descriptions.Item>
            <Descriptions.Item label="Product Code">{defaults.tank_base}</Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Badge status={tank.levels.hh} text="HH" />
                <Badge status={tank.levels.h} text="H" />
                <Badge status={tank.levels.l} text="L" />
                <Badge status={tank.levels.ll} text="LL" />
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Observed Temperature" span={3}>
              {defaults.tank_temp} °C
            </Descriptions.Item>
            <Descriptions.Item label="Reference Density" span={3}>
              {defaults.tank_15_density} Kg / m³
            </Descriptions.Item>
            <Descriptions.Item label="Reference Temperature" span={3}>
              {defaults.tank_base_ref_temp} °C
            </Descriptions.Item>

            <Descriptions.Item label="Tank Capacity" span={3}>
              {} ML
            </Descriptions.Item>
            <Descriptions.Item label="Level" span={3}>
              {defaults.tank_outflow_ope === "" ? 0 : defaults.tank_outflow_ope} CM
            </Descriptions.Item>
            <Descriptions.Item label="Observed Quantity" span={3}>
              {} ML
            </Descriptions.Item>
            <Descriptions.Item label="Standard Quantity" span={3}>
              {} ML
            </Descriptions.Item>
            <Descriptions.Item label="Weight in Air" span={3}>
              {defaults.tank_vapour_kg} T
            </Descriptions.Item>
            <Descriptions.Item label="Weight in Volume" span={3}>
              {defaults.tank_liquid_kg} T
            </Descriptions.Item>
            <Descriptions.Item label="Ullage" span={3}>
              {defaults.tank_ullage} ML
            </Descriptions.Item>
            <Descriptions.Item label="Pumpable Volume" span={3}>
              {} T
            </Descriptions.Item>
            <Descriptions.Item label="Water Level" span={3}>
              {defaults.tank_water_lvl} CM
            </Descriptions.Item>
            <Descriptions.Item label="Water Volume" span={3}>
              {defaults.tank_water} ML
            </Descriptions.Item>
            <Descriptions.Item label="Last Online" span={3}>
              {moment(defaults.tank_date, configuration.defaultTimeFormat).format(configuration.dateTimeFormat)}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane tab="Configuration" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    );
  }
}
