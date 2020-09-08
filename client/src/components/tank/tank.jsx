import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Card, Badge, Tag } from 'antd';
import ReactApexChart from 'react-apexcharts';

import { TankContainer } from './style';
import TankImage from './img.png';

const Tank = ({ item, handleFormState }) => {
  return (
    <TankContainer img={TankImage}>
      <Card
        size="small"
        title={`${item?.code} / ${item?.name}`}
        hoverable
        headStyle={{ paddingRight: 0 }}
        bodyStyle={{ background: item?.critical ? 'rgba(236,110,104, 0.3)' : item?.status?.colour }}
        onClick={() => handleFormState && handleFormState(true, item)}
        extra={
          <Tag icon={<SyncOutlined spin={item?.automatic} />} color={item?.automatic ? 'green' : 'gold'}>
            {item?.automatic ? 'Automatic' : 'Manual'}
          </Tag>
        }
        actions={[
          <Badge status={item?.levels?.status?.hh} text="HH" />,
          <Badge status={item?.levels?.status?.h} text="H" />,
          <Badge status={item?.levels?.status?.l} text="L" />,
          <Badge status={item?.levels?.status?.ll} text="LL" />,
          <Badge status={item?.levels?.status?.userH} text="UH" />,
          <Badge status={item?.levels?.status?.userL} text="UL" />,
        ]}
      >
        <ReactApexChart options={item?.options} series={item?.series} type="bar" height={188} width={250} />
      </Card>
    </TankContainer>
  );
};

export default Tank;
