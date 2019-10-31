import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import columns from './columns';

const summary = (arms, tank, t) => {
  return (
    <div className="flow-rate-summary">
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
    </div>
  );
};

const FlowRates = (tank, t) => {
  return (
    <Table
      size="small"
      columns={columns(t)}
      dataSource={tank.arms}
      pagination={false}
      title={arms => summary(arms, tank, t)}
      rowKey="baa_code"
      className="nested-table"
    />
  );
};

export default FlowRates;
