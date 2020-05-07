import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Tabs } from 'antd';

import { DashboardContainer } from './styles';
import { Page, Chart } from '../../components';
import auth from '../../auth';

import Home from './home';
import Overview from './overview';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Page page={t('pageMenu.dashboard')} isBlank noHeader>
      <DashboardContainer>
        <Tabs type="card" defaultActiveKey="0">
          <Tabs.TabPane tab="Home" key="0">
            <Home />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Overview" key="1">
            <Overview />
          </Tabs.TabPane>
        </Tabs>
      </DashboardContainer>
    </Page>
  );
};

export default auth(Dashboard);
