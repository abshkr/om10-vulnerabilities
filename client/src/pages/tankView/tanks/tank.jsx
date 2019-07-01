import React, { Component } from "react";
import { Descriptions, Badge, Tabs } from "antd";

export default class Tank extends Component {
  render() {
    const tank = this.props.tank.default;
    const { TabPane } = Tabs;
    console.log(tank);
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Information" key="1" style={{ height: 600 }} size="small">
          <Descriptions bordered>
            <Descriptions.Item label="Observed Temperature">{tank.tank_temp}</Descriptions.Item>
            <Descriptions.Item label="Reference Density">{tank.tank_15_density}</Descriptions.Item>
            <Descriptions.Item label="Reference Temperature">test</Descriptions.Item>

            <Descriptions.Item label="Product">{tank.tank_base_name}</Descriptions.Item>
            <Descriptions.Item label="Product Code">{tank.tank_base}</Descriptions.Item>

            <Descriptions.Item label="Tank Capacity" span={3}>
              Prepaid
            </Descriptions.Item>
            <Descriptions.Item label="Level" span={3}>
              {tank.tank_outflow_ope === "" ? 0 : tank.tank_outflow_ope}
            </Descriptions.Item>
            <Descriptions.Item label="Observed Quantity" span={3}>
              Prepaid
            </Descriptions.Item>
            <Descriptions.Item label="Standard Quantity" span={3}>
              test
            </Descriptions.Item>
            <Descriptions.Item label="Weight in Air" span={3}>
              Prepaid
            </Descriptions.Item>
            <Descriptions.Item label="Weight in Volume" span={3}>
              test
            </Descriptions.Item>
            <Descriptions.Item label="Ullage" span={3}>
              {tank.tank_ullage}
            </Descriptions.Item>
            <Descriptions.Item label="Pumpable Volume" span={3}>
              test
            </Descriptions.Item>
            <Descriptions.Item label="Water Level" span={3}>
              test
            </Descriptions.Item>
            <Descriptions.Item label="Water Volume" span={3}>
              test
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane tab="Level" key="2">
          Content of Tab Pane 2
        </TabPane>

        <TabPane tab="Configuration" key="3">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    );
  }
}
