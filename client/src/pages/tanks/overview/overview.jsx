import React from 'react';
import { Descriptions, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { OverviewContainer, Container } from './style';
import { Icons } from '../../../components';

const Overview = ({ selected, isLoading }) => {
  const { t } = useTranslation();

  return (
    <Card hoverable loading={isLoading}>
      <OverviewContainer>
        <Container centered>
          <Icons type="tank" size={400} />
        </Container>

        <Container>
          <Descriptions
            bordered
            size="small"
            layout="horizontal"
            title={`${selected?.tank_code} - ${selected?.tank_name}`}
          >
            <Descriptions.Item label={t('fields.tankCode')} span={24}>
              {selected?.tank_code}
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.product')} span={24}>
              {selected?.tank_base_name}
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.productLevel')} span={24}>
              {selected?.tank_prod_lvl} mm
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.observedVolume')} span={24}>
              {selected?.tank_amb_vol} Litres
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.standardVolume')} span={24}>
              {selected?.tank_cor_vol} Litres
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.temperature')} span={24}>
              {selected?.tank_temp} C
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.standardDensity')} span={24}>
              {selected?.tank_15_density} Kg/M3
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.weightInAir')} span={24}>
              {selected?.tank_vapour_kg} Kg
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.weightInVaccum')} span={24}></Descriptions.Item>

            <Descriptions.Item label={t('fields.waterLevel')} span={24}>
              {selected?.tank_water_lvl} Kg
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.maximumCapacity')} span={24}>
              {_.toNumber(selected?.tank_ullage) || 0 + _.toNumber(selected?.tank_cor_vol) || 0} Litres
            </Descriptions.Item>

            <Descriptions.Item label={t('fields.classification')} span={24}>
              {selected?.tank_bclass_name}
            </Descriptions.Item>
          </Descriptions>
        </Container>
      </OverviewContainer>
    </Card>
  );
};

export default Overview;
