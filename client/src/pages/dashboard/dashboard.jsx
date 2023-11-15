import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Switch } from 'antd';

import { DashboardContainer } from './styles';
import { Page } from '../../components';
import auth from '../../auth';

import Home from './home';
import Overview from './overview';
import ReleaseNotes from './release-notes';
import { useAuth } from '../../hooks';

const Dashboard = ({ user }) => {
  const { t } = useTranslation();

  const [baseFlag, setBaseFlag] = useState(false);
  const [tabKey, setTabKey] = useState('0');

  const access = useAuth('MENU_HOME');

  const onChangeColors = async (v) => {
    setBaseFlag(v);
  };

  const modifiers = (
    <>
      {tabKey === '1' && (
        <Switch
          checked={baseFlag}
          checkedChildren={<span>{t('operations.baseColorOn')}</span>}
          unCheckedChildren={<span>{t('operations.baseColorOff')}</span>}
          onChange={(value) => onChangeColors(value)}
        />
      )}
    </>
  );

  return (
    <Page page={t('pageMenu.dashboard')} minimal access={access}>
      <DashboardContainer>
        <Tabs type="card" defaultActiveKey="0" tabBarExtraContent={modifiers} onChange={setTabKey}>
          <Tabs.TabPane tab={t('tabColumns.home')} key="0">
            <Home />
          </Tabs.TabPane>

          <Tabs.TabPane tab={t('tabColumns.overview')} key="1">
            <Overview baseFlag={baseFlag} />
          </Tabs.TabPane>

          {user?.per_code === '9999' && (
            <Tabs.TabPane tab={t('tabColumns.releaseNotes')} key="3">
              <ReleaseNotes />
            </Tabs.TabPane>
          )}
        </Tabs>
      </DashboardContainer>
    </Page>
  );
};

export default auth(Dashboard);
