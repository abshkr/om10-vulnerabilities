import React from 'react';
import { Table, Space } from 'antd';
import _ from 'lodash';
import columns from './columns';
import { AdaptiveFlowSummary, AdaptiveFlowExpansion } from '../styles';

const summary = (arms, tank, t) => {
  return (
    <AdaptiveFlowSummary>
      <p>
        <span>{t('descriptions.tankMaxFlowRate')}: </span>
        {tank.max.toFixed(2)} {t('units.lpm')}
      </p>
      <p>
        <span>{t('descriptions.actualTankFlowRate')}: </span>
        {_.sumBy(arms, 'current_flow_rate').toFixed(2)} {t('units.lpm')}
      </p>
      <p>
        <span>{t('descriptions.flowContribution')}: </span>
        {_.sumBy(arms, 'flow_contribution').toFixed(2)} {t('units.lpm')}
      </p>
    </AdaptiveFlowSummary>
  );
};

const FlowRates = (tank, t) => {
  return (
    <>
      <AdaptiveFlowExpansion>
        <Table
          size="small"
          columns={columns(t)}
          dataSource={tank.arms}
          pagination={false}
          title={(arms) => summary(arms, tank, t)}
          rowKey="baa_code"
        />
      </AdaptiveFlowExpansion>
      <Space size={'middle'}>&nbsp;</Space>
    </>
  );
};

export default FlowRates;
