import React, { Component } from "react";
import auth from "../../utils/auth";
import { Tabs } from "antd";
import Page from "../../components/page";
const TabPane = Tabs.TabPane;

class SiteConfiguration extends Component {
  render() {
    return (
      <Page page={"Site Configuration"} isLoading={false} block={true}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Screeen Access" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="General" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Driver Pin" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Closeout Options" key="4">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Terminal Locations" key="5">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Seal" key="6">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Page>
    );
  }
}

export default auth(SiteConfiguration);
