import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Switch, Button } from 'antd';
import useSWR from 'swr';

import { DashboardContainer } from './styles';
import { Page } from '../../components';
import auth from '../../auth';

import BaseColorsManager from './base-colors';
import Home from './home';
import Overview from './overview';
import ReleaseNotes from './release-notes';
import { useAuth } from '../../hooks';
import { BASE_PRODUCTS } from '../../api';

const Dashboard = ({ user }) => {
  const { t } = useTranslation();

  const { data: payloadBases, mutate: revalidate } = useSWR(`${BASE_PRODUCTS.READ}`);

  const [baseFlag, setBaseFlag] = useState(false);
  const [tabKey, setTabKey] = useState('0');

  const access = useAuth('MENU_HOME');

  const onChangeColors = async (v) => {
    setBaseFlag(v);
  };

  const loadBaseColors = async () => {
    console.log('Forms: loadBaseColors', baseFlag);
    // setFieldsValue({bases: ratios});
    revalidate();
  };

  const handleBaseColors = () => {
    // pop up the dialog to manage straping data import
    console.log('......handleBaseColors..', baseFlag);
    BaseColorsManager(t('operations.baseProdColor'), loadBaseColors, '80vw', '50vh');
  };

  const modifiers = (
    <>
      {tabKey === '1' && baseFlag && (
        <Button type="primary" onClick={handleBaseColors} style={{ float: 'left', marginRight: 5 }}>
          {t('operations.baseProdColor')}
        </Button>
      )}
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
            <Overview baseFlag={baseFlag} payloadBases={payloadBases} />
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
