import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Card, Badge, Tag, Tooltip } from 'antd';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { TankContainer, TankImage, TankChart, TankIndicators, TankVolume } from './style';
import Image from './img.png';

import config from './config';

const Tank = ({ item, handleFormState }) => {
  const { t } = useTranslation();
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
            {t('fields.gaugingMethod')}: {item?.automatic ? t('fields.gaugingAuto') : t('fields.gaugingManual')}
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
          <Tooltip placement="right" title={t('fields.hhState')} >
            <Badge status={item?.levels?.status?.hh} text="HH" />
          </Tooltip>
          <Tooltip placement="right" title={t('fields.hState')} >
            <Badge status={item?.levels?.status?.h} text="H" />
          </Tooltip>
          <Tooltip placement="right" title={t('fields.lState')} >
            <Badge status={item?.levels?.status?.l} text="L" />
          </Tooltip>
          <Tooltip placement="right" title={t('fields.llState')} >
            <Badge status={item?.levels?.status?.ll} text="LL" />
          </Tooltip>
        </TankIndicators>

        <TankIndicators position="right" height={180}>
          <Tooltip placement="left" title={t('fields.userHState')} >
            <Badge status={item?.levels?.status?.userH} text="UH" />
          </Tooltip>
          <Tooltip placement="left" title={t('fields.userLState')} >
            <Badge status={item?.levels?.status?.userL} text="UL" />
          </Tooltip>
        </TankIndicators>

        <TankVolume>{item?.percentage}%</TankVolume>
      </Card>
    </TankContainer>
  );
};

export default Tank;
