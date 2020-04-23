import React from 'react';
import { Drawer, Tabs } from 'antd';

const { TabPane } = Tabs;

const SideDrawer = ({ visible, handleClose }) => {
  return (
    <Drawer placement="right" onClose={handleClose} visible={visible} width={400}>
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab="Events" key="1"></TabPane>
        <TabPane tab="Quick Settings" key="3"></TabPane>
      </Tabs>
    </Drawer>
  );
};

export default SideDrawer;
