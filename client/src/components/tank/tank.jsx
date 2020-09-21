import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Card, Badge, Tag } from 'antd';
import { Bar } from 'react-chartjs-2';

import { TankContainer, TankImage, TankChart, TankIndicators, TankVolume } from './style';
import Image from './img.png';

import config from './config';

const Tank = ({ item, handleFormState }) => {
  return (
    <TankContainer critical={item?.critical} status={item?.status}>
      <Card
        size="small"
        title={`${item?.code} / ${item?.name}`}
        hoverable
        headStyle={{ paddingRight: 0 }}
        onClick={() => handleFormState && handleFormState(true, item)}
        extra={<Tag>{item?.status?.name}</Tag>}
        actions={[
          <Tag color={item?.baseColour}>{item?.tank_base_name}</Tag>,

          <Tag icon={<SyncOutlined spin={item?.automatic} />} color={item?.automatic ? 'green' : 'gold'}>
            Gauging: {item?.automatic ? 'Automatic' : 'Manual'}
          </Tag>,
        ]}
      >
        <TankImage>
          <img src={Image} alt="Logo" />
        </TankImage>

        <TankChart className="tank-bar">
          <Bar height={210} data={item?.payload || {}} options={config} />
        </TankChart>

        <TankIndicators position="left" height={160}>
          <Badge status={item?.levels?.status?.hh} text="HH" />
          <Badge status={item?.levels?.status?.h} text="H" />
          <Badge status={item?.levels?.status?.l} text="L" />
          <Badge status={item?.levels?.status?.ll} text="LL" />
        </TankIndicators>

        <TankIndicators position="right" height={180}>
          <Badge status={item?.levels?.status?.userH} text="UH" />
          <Badge status={item?.levels?.status?.userL} text="UL" />
        </TankIndicators>

        <TankVolume>{item?.percentage}%</TankVolume>
      </Card>
    </TankContainer>
  );
};

export default Tank;
