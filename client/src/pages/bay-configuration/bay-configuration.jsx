import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tabs } from 'antd';
import Iframe from 'react-iframe';
import useSWR from 'swr';

import { Page, ListView } from 'components';
import auth from 'auth';

import { useAuth, useConfig } from 'hooks';
import { BAY_CONFIGURATION } from 'api';

import Bay from './bay';
import BayDetails from './bay-details';
import BayArms from './bay-arms';
import BayTanks from './bay-tanks';
import BayInjectors from './bay-injectors';
import BayMeters from './bay-meters';

const { TabPane } = Tabs;

const BayConfiguration = () => {
  const { t } = useTranslation();

  const config = useConfig();

  const { data: payload } = useSWR(BAY_CONFIGURATION.READ);

  const access = useAuth('M_LOADBAYS');

  const [selected, setSelected] = useState(null);

  const page = t('pageMenu.config');
  const name = t('pageNames.bayConfiguration');

  const isLoading = !payload;

  const description = [
    {
      field: t('fields.countArms'),
      key: 'arm_counts',
    },
    {
      field: t('fields.countMeters'),
      key: 'mtr_counts',
    },
    {
      field: t('fields.countInjectors'),
      key: 'inj_counts',
    },
    {
      field: t('fields.countTanks'),
      key: 'tank_counts',
    },
    {
      field: t('fields.countBases'),
      key: 'base_counts',
    },
    {
      field: t('fields.countBaseClasses'),
      key: 'bclass_counts',
    },
  ];

  return (
    <Page page={page} name={name} transparent avatar="bayConfiguration" access={access}>
      <ListView
        data={payload?.records}
        id="ba_code"
        name="bad_name"
        description={description}
        isLoading={isLoading}
        onSelect={setSelected}
        selected={selected?.ba_code}
      >
        <Tabs defaultActiveKey="1" type="card">
          <TabPane key="1" tab={t('tabColumns.overview')} disabled={isLoading}>
            <Bay selected={selected} />
          </TabPane>

          <TabPane key="2" tab={t('tabColumns.bayDetails')} disabled={isLoading}>
            <BayDetails selected={selected} access={access} config={config} setSelected={setSelected} />
          </TabPane>

          <TabPane key="3" tab={t('tabColumns.bayArms')} disabled={isLoading}>
            <BayArms bay={selected?.stream_baycode} value={selected} access={access} config={config} />
          </TabPane>

          <TabPane key="4" tab={t('tabColumns.bayMeters')} disabled={isLoading}>
            <BayMeters bay={selected?.stream_baycode} value={selected} access={access} config={config} />
          </TabPane>

          <TabPane key="5" tab={t('tabColumns.bayInjectors')} disabled={isLoading}>
            <BayInjectors bay={selected?.stream_baycode} value={selected} access={access} config={config} />
          </TabPane>

          <TabPane key="6" tab={t('tabColumns.bayTanks')} disabled={isLoading}>
            <BayTanks bay={selected?.stream_baycode} value={selected} access={access} config={config} />
          </TabPane>
        </Tabs>
      </ListView>
    </Page>
  );
};

export default auth(BayConfiguration);
