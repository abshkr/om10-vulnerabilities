import React, { Component } from "react";
import auth from "../../utils/auth";
import LiveJournal from "./live";
import HistoricalJournal from "./historical";
import Page from "../../components/page";
import Container from "../../components/container";
import { Tabs, Icon } from "antd";

import "./journal.css";

const TabPane = Tabs.TabPane;

class Journal extends Component {
  render() {
    return (
      <Page page={"Reports"} name={"Journal"} isLoading={false} block>
        <Container>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <Icon type="sync" />
                  Live
                </span>
              }
              key="1"
            >
              <LiveJournal />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="read" />
                  Historical
                </span>
              }
              key="2"
            >
              <HistoricalJournal />
            </TabPane>
          </Tabs>
        </Container>
      </Page>
    );
  }
}

export default auth(Journal);
