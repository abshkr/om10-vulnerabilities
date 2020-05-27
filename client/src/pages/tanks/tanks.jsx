import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Tabs } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { TANKS } from '../../api';
import { useAuth, useConfig } from '../../hooks';
import { Page, Download, DataTable, ListView } from '../../components';

import Calculations from './calculations';
import TankStrapping from './strapping';
import Overview from './overview';
import Gauging from './gauging';
import Details from './details';
import Alarms from './alarms';

import auth from '../../auth';
import columns from './columns';
import transform from './transform';

const { TabPane } = Tabs;

const Tanks = () => {
  const { data: read, revalidate } = useSWR(TANKS.READ);
  const { t } = useTranslation();

  const access = useAuth('M_TANKSTATUS');
  const config = useConfig();

  const [selected, setSelected] = useState(null);
  const [payload, setPayload] = useState([]);
  const [mode, setMode] = useState('1');
  const [tab, setTab] = useState('1');

  const simple = mode === '1';
  const fields = columns(t);
  const isLoading = !read;

  const page = t('pageMenu.gantry');
  const name = t('pageNames.tanks');

  const onSelect = (value) => {
    setSelected(value);
  };

  const onViewChange = () => {
    const view = simple ? '2' : '1';

    setMode(view);
  };

  const modifiers = (
    <>
      <Button shape="round" type="primary" onClick={onViewChange}>
        {simple ? t('operations.list') : t('operations.simple')}
      </Button>

      <Button type="primary" shape="round" onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download round data={payload} isLoading={isLoading} columns={fields} />

      <Button type="primary" shape="round" loading={isLoading} disabled={!access.canCreate}>
        {t('operations.create')}
      </Button>
    </>
  );

  const description = [
    {
      field: t('fields.baseProduct'),
      key: 'tank_base_name',
    },
    {
      field: t('fields.density'),
      key: 'tank_density',
    },
    {
      field: t('fields.classification'),
      key: 'tank_bclass_name',
    },
    {
      field: t('fields.status'),
      key: 'tank_status_name',
    },
  ];

  useEffect(() => {
    if (read) {
      const records = transform(read?.records);

      setSelected(records[0]);
      setPayload(records);
    }
  }, [read]);

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} minimal={simple}>
      {simple ? (
        <ListView
          data={payload}
          id="tank_code"
          name="tank_name"
          onSelect={onSelect}
          description={description}
          selected={selected?.tank_code}
        >
          <Tabs defaultActiveKey="1" type="card" onChange={setTab}>
            <TabPane key="1" tab={t('tabColumns.overview')} disabled={isLoading}>
              <Overview selected={selected} isLoading={isLoading} />
            </TabPane>

            <TabPane key="2" tab={t('tabColumns.details')} disabled={isLoading}>
              <Details selected={selected} access={access} isLoading={isLoading} />
            </TabPane>

            <TabPane key="3" tab={t('tabColumns.connectedArms')} disabled></TabPane>

            <TabPane key="4" tab={t('tabColumns.calculations')} disabled={isLoading}>
              <Calculations selected={selected} access={access} isLoading={isLoading} config={config} />
            </TabPane>

            <TabPane key="5" tab={t('tabColumns.alarms')} disabled={isLoading}>
              <Alarms selected={selected} access={access} isLoading={isLoading} />
            </TabPane>

            <TabPane key="6" tab={t('tabColumns.gauge')} disabled={isLoading}>
              <Gauging selected={selected} access={access} isLoading={isLoading} />
            </TabPane>

            <TabPane key="7" tab={t('tabColumns.strapping')} disabled={isLoading}>
              <TankStrapping selected={selected} isLoading={isLoading} />
            </TabPane>

            <TabPane key="8" tab={t('tabColumns.adaptiveFlowControl')} disabled={isLoading}></TabPane>
          </Tabs>
        </ListView>
      ) : (
        <DataTable isLoading={isLoading} columns={fields} data={payload} />
      )}
    </Page>
  );
};

export default auth(Tanks);
