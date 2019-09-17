import React from "react";

import Live from "./live";
import auth from "../../auth";
import Historical from "./historical";
import { Tabs, Icon, Badge } from "antd";
import { Page, Loading } from "../../components";

import "./journal.css";

const Journal = ({ configuration }) => {
  const [tab, setTab] = React.useState("1");

  const handleTabChange = tab => setTab(tab);

  const TabPane = Tabs.TabPane;

  return (
    <Page page={"Reports"} name={"Journal"} isLoading={false} block>
      <Tabs defaultActiveKey="1" style={{ padding: 10 }} tabPosition="left" onChange={handleTabChange}>
        <TabPane
          className="live-table"
          tab={
            <span>
              <Badge status="processing" />
              Live
            </span>
          }
          key="1"
        >
          {tab === "1" ? <Live config={configuration} /> : <Loading />}
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="calendar" />
              Historical
            </span>
          }
          key="2"
        >
          {tab === "2" ? <Historical config={configuration} /> : <Loading />}
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(Journal);
