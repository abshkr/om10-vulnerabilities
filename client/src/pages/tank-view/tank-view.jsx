import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { List, Card, BackTop, Button, Badge, Tag } from 'antd';
import { UpOutlined, SyncOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';
import useSWR from 'swr';
import _ from 'lodash';

import { TANKS } from 'api';
import { TankViewContainer } from './style';
import { Page } from 'components';
import { useAuth } from 'hooks';
import auth from 'auth';

import TankImage from './img.png';

import transform from './transform';

const layout = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
  xxl: 5,
};

const TankView = () => {
  const { t } = useTranslation();
  const access = useAuth('M_TANKVIEW');

  const [tanks, setTanks] = useState([]);

  const {} = useSWR(TANKS.READ, {
    refreshInterval: 1000,
    onSuccess: (data) => {
      if (data?.records) {
        const payload = transform(data?.records);

        setTanks(payload.splice(0, 5));
      }
    },
  });

  return (
    <Page access={access} page={t('pageMenu.modules')} name={t('pageNames.tankView')} transparent>
      <TankViewContainer img={TankImage}>
        <List
          grid={layout}
          dataSource={tanks}
          loading={!tanks}
          renderItem={(item) => (
            <List.Item>
              <Card
                size="small"
                title={`${item?.code} / ${item?.name}`}
                hoverable
                headStyle={{ paddingRight: 0 }}
                bodyStyle={{ background: item?.status?.colour }}
                extra={
                  <Tag
                    icon={<SyncOutlined spin={item.automatic} />}
                    color={item?.automatic ? 'green' : 'gold'}
                  >
                    {item?.automatic ? 'Automatic' : 'Manual'}
                  </Tag>
                }
                actions={[
                  <Badge status={item?.levels?.status?.hh} text="HH" />,
                  <Badge status={item?.levels?.status?.h} text="H" />,
                  <Badge status={item?.levels?.status?.l} text="L" />,
                  <Badge status={item?.levels?.status?.ll} text="LL" />,
                ]}
              >
                <ReactApexChart options={item?.options} series={item?.series} type="bar" height={188} />
              </Card>
            </List.Item>
          )}
        />
        <BackTop>
          <Button type="primary" icon={<UpOutlined />}>
            Scroll Up
          </Button>
        </BackTop>
      </TankViewContainer>
    </Page>
  );
};

export default auth(TankView);
