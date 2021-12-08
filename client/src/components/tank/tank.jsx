import React from 'react';
import { SyncOutlined, UpOutlined, DownOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import {
  TankContainer,
  TankImage,
  TankChart,
  TankIndicators,
  TankVolume,
  TankIndicator,
  IndicatorContainer,
  TankLevel,
  WaterLevel,
  TankFlowRate,
} from './style';
import Image from './img.png';

import config from './config';

const Tank = React.memo(function Tank({ item }) {
  const { t } = useTranslation();

  const getLevels = () => {
    let levels = item?.tank_prod_lvl?.toLocaleString('en-AU') || '0' + ' ' + t('units.mm');
    if (item?.waterFlag) {
      levels += ' (' + item?.tank_water_lvl?.toLocaleString('en-AU') || '0' + ' ' + t('units.mm') + ')';
    }
    return levels;
  };

  return (
    <TankContainer critical={item?.critical} status={item?.status}>
      <Card
        size="small"
        title={`${item?.code} / ${item?.name}`}
        hoverable
        headStyle={{ paddingRight: 0 }}
        extra={
          <Tag
            style={{ color: 'rgb(0,84,164)', borderColor: 'rgb(0,84,164)', fontWeight: '400' }}
            color={item?.status?.colour}
          >
            {item?.status?.name}
          </Tag>
        }
        actions={[
          <Tag color={item?.baseColour}>{item?.tank_base_name}</Tag>,

          <Tag icon={<SyncOutlined spin={item?.automatic} />} color={item?.automatic ? 'green' : ''}>
            {t('fields.gaugingMethod')}:{' '}
            {item?.automatic ? t('fields.gaugingAuto') : t('fields.gaugingManual')}
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
          <IndicatorContainer>
            <TankIndicator status={item?.levels?.status?.hh} />
            <span>HH</span>
          </IndicatorContainer>

          <IndicatorContainer>
            <TankIndicator status={item?.levels?.status?.h} />
            <span>H</span>
          </IndicatorContainer>

          <IndicatorContainer>
            <TankIndicator status={item?.levels?.status?.l} />
            <span>L</span>
          </IndicatorContainer>

          <IndicatorContainer>
            <TankIndicator status={item?.levels?.status?.ll} />
            <span>LL</span>
          </IndicatorContainer>
        </TankIndicators>

        <TankIndicators position="right" height={180}>
          <IndicatorContainer>
            <TankIndicator status={item?.levels?.status?.userH} />
            <span>UH</span>
          </IndicatorContainer>

          <IndicatorContainer>
            <TankIndicator status={item?.levels?.status?.userL} />
            <span>UL</span>
          </IndicatorContainer>
        </TankIndicators>

        <TankVolume>{item?.percentage}%</TankVolume>
        <TankLevel>
          {item?.tank_prod_lvl?.toLocaleString('en-AU') || '0'} {t('units.mm')}
        </TankLevel>
        {item?.waterFlag && (
          <WaterLevel>
            {'W:'}
            {item?.tank_water_lvl?.toLocaleString('en-AU') || '0'} {t('units.mm')}
          </WaterLevel>
        )}
        <TankFlowRate style={{width: '100%', textAlign: 'center'}}>
          <span style={{color: (item?.tank_flow_rate_min > 0 ? 'rgb(0,164,0)' : item?.tank_flow_rate_min < 0 ? 'rgb(164,0,0)' : 'rgb(0,0,164)')}}>
            {item?.tank_flow_rate_min > 0 ? <ArrowUpOutlined/> : item?.tank_flow_rate_min < 0 ? <ArrowDownOutlined/> : ''}
          </span> 
          <Tag
            style={{ color: 'rgb(0,84,164)', borderColor: 'rgb(0,84,164)', fontWeight: '400' }}
            color={'rgba(220,220,220,0.3)'}
          >
            {item?.tank_flow_rate_min} {t('units.ltr/min')}
          </Tag>
          <Tag
            style={{ color: 'rgb(0,84,164)', borderColor: 'rgb(0,84,164)', fontWeight: '400' }}
            color={'rgba(220,220,220,0.3)'}
          >
            {item?.tank_flow_rate_hour} {t('units.m3/h')}
          </Tag>
        </TankFlowRate>
      </Card>
    </TankContainer>
  );
});

export default Tank;
