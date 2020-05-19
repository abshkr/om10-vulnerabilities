import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button, List, Avatar, Card, Tag, Tabs, Descriptions, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon, { LoadingOutlined } from '@ant-design/icons';
import { ReactComponent as TankSVG } from './tank.svg';

import { ReactComponent as ListIcon } from './list.svg';
import { ReactComponent as PlusIcon } from './new.svg';
import { ReactComponent as RotateIcon } from './rotate.svg';
import { ReactComponent as BarIcon } from './test.svg';
import { ReactComponent as ExportIcon } from './arrow.svg';
import { ReactComponent as SearchIcon } from './search.svg';

import { Page, Download, DataTable } from '../../components';
import { TANKS } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { search } from '../../utils';
import _ from 'lodash';

const { TabPane } = Tabs;

const ListOutlined = (props) => <Icon style={{ transform: 'scale(1.3)' }} component={ListIcon} {...props} />;
const PlusOutlined = (props) => <Icon style={{ transform: 'scale(1.3)' }} component={PlusIcon} {...props} />;

const SearchOutlined = (props) => (
  <Icon style={{ transform: 'scale(1.5)' }} component={SearchIcon} {...props} />
);

const SyncOutlined = (props) => (
  <Icon style={{ transform: 'scale(1.3)' }} component={RotateIcon} {...props} />
);

const BarsOutlined = (props) => <Icon style={{ transform: 'scale(1.3)' }} component={BarIcon} {...props} />;

const ExportOutlined = (props) => (
  <Icon style={{ transform: 'scale(1.3)' }} component={ExportIcon} {...props} />
);

const Tanks = () => {
  const [selected, setSelected] = useState(null);
  const [simpleMode, setSimpleMode] = useState(true);
  const [payload, setPayload] = useState([]);

  const { t } = useTranslation();

  const access = useAuth('M_TANKCONFIGURATION');

  const { data: read, isValidating, revalidate } = useSWR(TANKS.READ);

  const handleFormState = (visibility, value) => {
    setSelected(value);
  };

  const onSearch = (value) => {
    const results = search(value, read?.records);

    setPayload({
      records: results,
    });
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.gantry');
  const name = t('pageNames.tanks');

  const modifiers = (
    <>
      <Button
        shape="round"
        type="primary"
        icon={simpleMode ? <ListOutlined /> : <BarsOutlined />}
        onClick={() => setSimpleMode(!simpleMode)}
      >
        {simpleMode ? t('operations.list') : t('operations.simple')}
      </Button>

      <Button
        type="primary"
        shape="round"
        icon={<SyncOutlined />}
        onClick={() => revalidate()}
        loading={isLoading}
      >
        {t('operations.refresh')}
      </Button>

      <Download icon={<ExportOutlined />} round data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        shape="round"
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
    if (read) {
      setSelected(read?.records[0]);
      setPayload(read);
    }
  }, [read]);

  if (simpleMode) {
    return (
      <Page page={page} name={name} modifiers={modifiers} access={access} minimal>
        <div style={{ display: 'flex' }}>
          <div>
            <div style={{ paddingRight: 20 }}>
              <Input.Search
                size="large"
                placeholder="Search Tanks"
                enterButton={<SearchOutlined />}
                style={{ borderRadius: 5 }}
                onSearch={onSearch}
              />
            </div>
            <Scrollbars
              style={{
                padding: 5,
                marginTop: 15,
                height: 'calc(100vh - 235px)',
                width: '33.33vw',
              }}
            >
              <List
                itemLayout="horizontal"
                loading={{
                  indicator: <LoadingOutlined />,
                  spinning: isLoading,
                }}
                style={{ marginRight: 20 }}
                dataSource={payload?.records}
                renderItem={(item) => (
                  <Card
                    hoverable
                    size="small"
                    style={{
                      marginBottom: 5,
                      borderRadius: 5,
                      borderColor: 'red !important',
                    }}
                    onClick={() => setSelected(item)}
                  >
                    <List.Item>
                      <List.Item.Meta
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                        avatar={
                          <Avatar
                            size="large"
                            style={{
                              backgroundColor: status[item.tank_status_name],
                              color: 'rgba(0, 0, 0, 0.65)',
                            }}
                          >
                            {item.tank_code}
                          </Avatar>
                        }
                        title={<a>{item.tank_name}</a>}
                        description={
                          <div>
                            <Tag color="green">Status: {item.tank_status_name}</Tag>
                            <Tag color="blue">Density: {item.tank_density}</Tag>
                            <Tag color="orange">Product: {item.tank_base_name}</Tag>
                          </div>
                        }
                      />
                    </List.Item>
                  </Card>
                )}
              />
            </Scrollbars>
          </div>
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

                    borderRadius: 5,
                    border: '1px solid #0054a43b',
                    padding: 10,
                  }}
                >
                  {selected && (
                    <>
                      <div
                        style={{
                          width: '50%',
                          minHeight: '100%',
                          display: 'flex',
                          alignContent: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Icon
                          component={TankSVG}
                          style={{
                            fontSize: '400px',
                          }}
                        />
                      </div>

                      <div
                        style={{
                          width: '50%',
                          minHeight: '100%',
                          display: 'flex',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Descriptions bordered size="small" layout="vertical" title={selected?.tank_name}>
                          <Descriptions.Item label={t('fields.tankCode')}>
                            {selected?.tank_code}
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.product')}>
                            {selected?.tank_base_name}
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.productLevel')}>
                            {selected?.tank_prod_lvl} mm
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.observedVolume')}>
                            {selected?.tank_amb_vol} Litres
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.standardVolume')}>
                            {selected?.tank_cor_vol} Litres
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.temperature')}>
                            {selected?.tank_temp} C
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.standardDensity')}>
                            {selected?.tank_15_density} Kg/M3
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.weightInAir')}>
                            {selected?.tank_vapour_kg} Kg
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.weightInVaccum')}></Descriptions.Item>

                          <Descriptions.Item label={t('fields.waterLevel')}>
                            {selected?.tank_water_lvl} Kg
                          </Descriptions.Item>

                          <Descriptions.Item label={t('fields.maximumCapacity')}>
                            {_.toNumber(selected?.tank_ullage) || 0 + _.toNumber(selected?.tank_cor_vol) || 0}{' '}
                            Litres
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                    </>
                  )}

                  {!selected && (
                    <div
                      style={{
                        width: '100%',
                        minHeight: '100%',
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      Select A Tank To Begin
                    </div>
                  )}
                </div>
              </TabPane>
              <TabPane tab="Details" key="2" disabled={!selected}>
                <div
                  style={{
                    background: 'white',
                    borderRadius: 5,
                    border: '1px solid #0054a43b',
                    padding: '0 10px 10px 10px',
                    maxHeight: 'calc(100vh - 240px)',
                  }}
                >
                  <Forms value={selected} />
                </div>
              </TabPane>
              <TabPane tab="Strapping" key="3" disabled={!selected}>
                Coming Soon
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access}>
      <DataTable columns={fields} data={data} isLoading={isValidating} />
    </Page>
  );
};

export default auth(Tanks);
