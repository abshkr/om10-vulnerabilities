import React from 'react';
import { Drawer, Tabs, Timeline } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import SiteConfiguration from '../../pages/site-configuration';

const { TabPane } = Tabs;

const SideDrawer = ({ visible, handleClose }) => {
  return (
    <Drawer placement="right" onClose={handleClose} visible={visible} width={400}>
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab="Events" key="1">
          <Scrollbars style={{ height: '88vh' }}>
            <Timeline mode="left" style={{ paddingTop: 15 }}>
              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>

              <Timeline.Item color="red">
                <strong>2015-09-01</strong>
                <p>Solve initial network problems 2</p>
              </Timeline.Item>
            </Timeline>
          </Scrollbars>
        </TabPane>
        <TabPane tab="Settings" key="3">
          <SiteConfiguration />
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default SideDrawer;
