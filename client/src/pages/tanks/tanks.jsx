import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button, List, Avatar, Card, Tag, Tabs, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { SyncOutlined, PlusOutlined, TableOutlined, BarsOutlined } from '@ant-design/icons';
import { ReactComponent as TankSVG } from './tank.svg';
import Icon from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { TANKS } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

import _ from 'lodash';
const { TabPane } = Tabs;

const Tanks = () => {
  const [selected, setSelected] = useState(null);
  const [simpleMode, setSimpleMode] = useState(true);

  const { t } = useTranslation();

  const access = useAuth('M_TANKCONFIGURATION');

  const { data: payload, isValidating, revalidate } = useSWR(TANKS.READ);

  const handleFormState = (visibility, value) => {
    setSelected(value);
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.gantry');
  const name = t('pageNames.tanks');

  const modifiers = (
    <>
      <Button
        type="primary"
        icon={simpleMode ? <BarsOutlined /> : <TableOutlined />}
        onClick={() => setSimpleMode(!simpleMode)}
      >
        {simpleMode ? t('operations.simple') : t('operations.grid')}
      </Button>

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isLoading}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  const status = {
    'In Service - Not used': '#a6acec',
    'Out of Service': 'rgba(103,164,236, 0.2)',
    'In Service - Working': 'rgba(255,255,224,0.9)',
    'In Service - Loading': 'rgba(148,205,108,0.3)',
    'In Service - Settling': 'rgba(255,191,0,0.2)',
    'In Service - Receiving': 'rgba(155,136,233,0.2)',
    'Out Of Service - Offline': '#fa4659',
  };

  useEffect(() => {
    if (payload) {
      setSelected(payload?.records[0]);
    }
  }, [payload]);

  if (simpleMode) {
    return (
      <Page page={page} name={name} modifiers={modifiers} access={access} minimal>
        <div style={{ display: 'flex' }}>
          <Scrollbars
            style={{
              padding: 5,
              height: 'calc(100vh - 180px)',
              width: '33.33vw',
            }}
          >
            <List
              itemLayout="horizontal"
              style={{ marginRight: 20 }}
              dataSource={payload?.records}
              renderItem={(item) => (
                <Card
                  hoverable
                  size="small"
                  style={{
                    marginBottom: 5,
                    borderRadius: 5,
                  }}
                  onClick={() => setSelected(item)}
                >
                  <List.Item>
                    <List.Item.Meta
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                      avatar={
                        <Avatar size="large" style={{ backgroundColor: status[item.tank_status_name] }}>
                          {item.tank_code}
                        </Avatar>
                      }
                      title={<a>{item.tank_name}</a>}
                      description={
                        <div>
                          <Tag>{item.tank_status_name}</Tag>
                          <Tag>{item.tank_lvlalarm_desc}</Tag>
                          <Tag>{item.tank_base_name}</Tag>
                        </div>
                      }
                    />
                  </List.Item>
                </Card>
              )}
            />
          </Scrollbars>

          <div
            style={{
              width: '66.66vw',
              height: 'calc(100vh - 180px)',
              marginLeft: 10,
            }}
          >
            <Tabs type="card">
              <TabPane tab="Overview" key="1">
                <div
                  style={{
                    minHeight: 'calc(100vh - 240px)',
                    background: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderRadius: 5,
                    border: '1px solid #0054a43b',
                    padding: 10,
                  }}
                >
                  <Icon
                    component={TankSVG}
                    style={{
                      fontSize: '400px',
                    }}
                  />

                  <Descriptions bordered size="small" layout="vertical" title={selected?.tank_name}>
                    <Descriptions.Item label={t('fields.tankCode')}>{selected?.tank_code}</Descriptions.Item>

                    <Descriptions.Item label={t('fields.product')}>
                      {selected?.tank_base_name}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('fields.productLevel')}>
                      {selected?.tank_prod_lvl}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('fields.observedVolume')}>
                      {selected?.tank_amb_vol}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('fields.standardVolume')}>
                      {selected?.tank_cor_vol}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('fields.temperature')}>
                      {selected?.tank_temp}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('fields.standardDensity')}>
                      {selected?.tank_15_density}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('fields.weightInAir')}>
                      {selected?.tank_vapour_kg}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('fields.weightInVaccum')}></Descriptions.Item>

                    <Descriptions.Item label={t('fields.waterLevel')}>
                      {selected?.tank_water_lvl}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('fields.maximumCapacity')}>
                      {_.toNumber(selected?.tank_ullage) || 0 + _.toNumber(selected?.tank_cor_vol) || 0}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </TabPane>
              <TabPane tab="Details" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Strapping" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Page>
    );
  }

  return <Page page={page} name={name} modifiers={modifiers} access={access}></Page>;
};

export default auth(Tanks);
