import React from 'react';

import Live from './live';
import auth from '../../auth';
import Historical from './historical';
import { Page } from '../../components';

import { Tabs, Icon, Badge } from 'antd';

const Journal = ({ configuration, t }) => {
  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.journal')} isLoading={false}>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <Tabs.TabPane
          tab={
            <span>
              <Badge status="processing" />
              {t('tabColumns.liveJournal')}
            </span>
          }
          key="1"
        >
          <Live configuration={configuration} t={t} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="calendar" />
              {t('tabColumns.historicalJournal')}
            </span>
          }
          key="2"
        >
          <Historical configuration={configuration} t={t} />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(Journal);
