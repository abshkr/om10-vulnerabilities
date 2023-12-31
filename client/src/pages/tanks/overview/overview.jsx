import React from 'react';
import { Descriptions, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { OverviewContainer, Container } from './style';
import { Icons } from '../../../components';
import { DecimalThousandSeparator } from 'components';

const Overview = ({ selected, isLoading, config }) => {
  const { t } = useTranslation();

  return (
    <Card hoverable loading={isLoading}>
      <OverviewContainer>
        <Container centered>
          <Icons type="tank" size={400} />
        </Container>

        <Container>
          {selected && (
            <Descriptions
              bordered
              size="small"
              layout="horizontal"
              title={`${selected?.tank_code} - ${selected?.tank_name}`}
              column={24}
            >
              <Descriptions.Item label={t('fields.tankCode')} span={24}>
                {selected?.tank_code}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.terminal')} span={24}>
                {selected?.tank_terminal + ' - ' + selected?.tank_sitename}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.product')} span={24}>
                {selected?.tank_base + ' - ' + selected?.tank_base_name}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.productLevel')} span={24}>
                {selected?.tank_prod_lvl} {t('units.mm')}
              </Descriptions.Item>

              <Descriptions.Item label={t(config?.siteLabelUser + 'fields.observedVolume')} span={24}>
                <DecimalThousandSeparator text={selected?.tank_amb_vol} /> {t('units.litres')}
              </Descriptions.Item>

              <Descriptions.Item label={t(config?.siteLabelUser + 'fields.standardVolume')} span={24}>
                <DecimalThousandSeparator text={selected?.tank_cor_vol} /> {t('units.litres')}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.temperature')} span={24}>
                {selected?.tank_temp} {t('units.degC')}
              </Descriptions.Item>

              <Descriptions.Item label={t('fields.standardDensity')} span={24}>
                <DecimalThousandSeparator text={selected?.tank_density} /> {t('units.kg/m3')}
                {/* {selected?.tank_15_density} {t('units.kg/m3')} */}
              </Descriptions.Item>

              {config?.siteMassInVacuum && (
                <Descriptions.Item label={t(config?.siteLabelUser + 'fields.weightInVacuum')} span={24}>
                  <DecimalThousandSeparator text={selected?.tank_liquid_kg} /> {t('units.kg')}
                </Descriptions.Item>
              )}

              {config?.siteMassInAir && (
                <Descriptions.Item label={t(config?.siteLabelUser + 'fields.weightInAir')} span={24}>
                  <DecimalThousandSeparator text={selected?.tank_air_kg} /> {t('units.kg')}
                </Descriptions.Item>
              )}

              {/* <Descriptions.Item label={t('fields.waterLevel')} span={24}>
                {selected?.tank_water_lvl} {t('units.mm')}
              </Descriptions.Item> */}

              {/* <Descriptions.Item label={t('fields.maximumCapacity')} span={24}>
                {selected?.tank_max_capacity} {selected?.tank_max_capacity==='' ? '' : t('units.litres')}
              </Descriptions.Item> */}

              <Descriptions.Item label={t('fields.baseProdClassDesc')} span={24}>
                {selected?.tank_bclass_name}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Container>
      </OverviewContainer>
    </Card>
  );
};

export default Overview;
