import React, { Component } from "react";

import Live from "./live";
import auth from "../../auth";
import { Tabs, Icon } from "antd";
import Historical from "./historical";
import { Page } from "../../components";

import "./journal.css";

const TabPane = Tabs.TabPane;

class Journal extends Component {
  render() {
    const { configuration } = this.props;
    return (
      <Page page={"Reports"} name={"Journal"} isLoading={false} block>
        <Tabs defaultActiveKey="1" style={{ padding: 10 }} tabPosition="left">
          <TabPane
            className="live-table"
            tab={
              <span>
                <Icon type="sync" />
                Live
              </span>
            }
            key="1"
          >
            <Live config={configuration} />
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
            <Historical />
          </TabPane>
        </Tabs>
      </Page>
    );
  }
}

export default auth(Journal);
