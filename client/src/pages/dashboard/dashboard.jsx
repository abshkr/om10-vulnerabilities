import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

import { DashboardContainer } from './styles';
import { Page } from '../../components';
import auth from '../../auth';

import Home from './home';
import Overview from './overview';
import ReleaseNotes from './release-notes';
import { useAuth } from '../../hooks';

const Dashboard = ({ user }) => {
  const { t } = useTranslation();

  const access = useAuth('MENU_HOME');

  return (
    <Page page={t('pageMenu.dashboard')} minimal access={access}>
      <DashboardContainer>
        <Tabs type="card" defaultActiveKey="0">
          <Tabs.TabPane tab="Home" key="0">
            <Home />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Overview" key="1">
            <Overview />
          </Tabs.TabPane>

          {user?.per_code === '9999' && (
            <Tabs.TabPane tab="Release Notes" key="3">
              <ReleaseNotes />
            </Tabs.TabPane>
          )}
        </Tabs>
      </DashboardContainer>
    </Page>
  );
};

export default auth(Dashboard);
