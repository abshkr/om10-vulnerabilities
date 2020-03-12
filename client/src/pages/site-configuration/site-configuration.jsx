import React, { useState } from 'react';
import { Drawer, Tabs, Button } from 'antd';

const { TabPane } = Tabs;

const SiteConfiguration = () => {
  const [isVisible, setVisible] = useState(false);

  const handleVisibility = () => {
    const visibility = !isVisible;

    setVisible(visibility);
  };

  return (
    <div>
      <Button type="primary" style={{ width: '100%' }} onClick={handleVisibility}>
        Site Configuration
      </Button>

      <Drawer width={700} onClose={handleVisibility} visible={isVisible}>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab="General" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Screen Access" key="2">
            Content of Tab Pane 2
          </TabPane>

          <TabPane tab="Driver Pin" key="3">
            Content of Tab Pane 3
          </TabPane>

          <TabPane tab="Closeout Options" key="4">
            Closeout Options
          </TabPane>

          <TabPane tab="Terminal Locations" key="5"></TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
};

export default SiteConfiguration;
