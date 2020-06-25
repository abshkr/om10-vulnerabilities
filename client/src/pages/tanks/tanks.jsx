import React, { useState, useEffect } from 'react';
import { SyncOutlined, SwapOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Tabs } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { useLocation } from 'react-router-dom';

import { TANKS } from '../../api';
import { useAuth, useConfig } from '../../hooks';
import { Page, Download, ListView } from '../../components';

import ConnectedArms from './connected-arms';
import Calculations from './calculations';
import TankStrapping from './strapping';
import Overview from './overview';
import Gauging from './gauging';
import Details from './details';
import Alarms from './alarms';
import Table from './table';

import auth from '../../auth';
import columns from './columns';
import transform from './transform';

const { TabPane } = Tabs;

const Tanks = () => {
  const { data: read, revalidate } = useSWR(TANKS.READ);
  const { t } = useTranslation();

  const location = useLocation();
  const access = useAuth('M_TANKSTATUS');
  const config = useConfig();

  const [selected, setSelected] = useState(null);
  const [payload, setPayload] = useState([]);
  const [visible, setVisible] = useState(false);
  const [listSelected, setlistSelected] = useState(null);

  const [mode, setMode] = useState('1');

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
      <Button type="primary" onClick={onViewChange} loading={isLoading} icon={<SwapOutlined />}>
        {simple ? t('operations.list') : t('operations.simple')}
      </Button>

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload} isLoading={isLoading} columns={fields} />
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

      setPayload(records);

      if (!selected || mode === '2') {
        setSelected(null);
        setSelected(records[0]);
      }
    }
  }, [read]);

  useEffect(() => {
    if (location?.state?.listed) {
      setMode('2');
    }
  }, [location]);

  return (
    <Page
      page={page}
      name={name}
      modifiers={modifiers}
      access={access}
      transparent={simple}
      avatar="tankScreen"
    >
      {simple ? (
        <ListView
          data={payload}
          id="tank_code"
          name="tank_name"
          onSelect={onSelect}
          description={description}
          selected={selected?.tank_code}
          isLoading={isLoading}
        >
          <Tabs defaultActiveKey="1" type="card">
            <TabPane key="1" tab={t('tabColumns.overview')} disabled={isLoading}>
              <Overview selected={selected} />
            </TabPane>

            <TabPane key="2" tab={t('tabColumns.details')} disabled={isLoading}>
              <Details selected={selected} access={access} config={config} />
            </TabPane>

            <TabPane key="3" tab={t('tabColumns.connectedArms')} disabled={isLoading}>
              <ConnectedArms arms={selected?.arms} />
            </TabPane>

            <TabPane key="4" tab={t('tabColumns.calculations')} disabled={isLoading}>
              <Calculations selected={selected} access={access} config={config} />
            </TabPane>

            {config?.manageTankLevelAlarms && (
              <TabPane key="5" tab={t('tabColumns.alarms')} disabled={isLoading}>
                <Alarms selected={selected} access={access} />
              </TabPane>
            )}

            <TabPane key="6" tab={t('tabColumns.gauge')} disabled={isLoading}>
              <Gauging selected={selected} access={access} />
            </TabPane>

            {config.manageTankStrapping && (
              <TabPane key="7" tab={t('tabColumns.strapping')}>
                <TankStrapping code={selected?.tank_code} tanks={read} access={access} />
              </TabPane>
            )}

            <TabPane key="8" tab={t('tabColumns.adaptiveFlowControl')} disabled />
          </Tabs>
        </ListView>
      ) : (
        <Table
          data={read?.records}
          visible={visible}
          setVisible={setVisible}
          selected={listSelected}
          setSelected={setlistSelected}
          config={config}
        />
      )}
    </Page>
  );
};

export default auth(Tanks);
