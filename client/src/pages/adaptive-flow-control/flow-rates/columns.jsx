import React from 'react';
import { Badge } from 'antd';

const columns = (t) => [
  {
    title: t('fields.activeTank'),
    dataIndex: 'tank_code',
    key: 'active_tank',
    align: 'center',
    // eslint-disable-next-line
    render: (text) => <a>{text}</a>,
  },
  { title: t('fields.bay'), dataIndex: 'bad_physcode', align: 'center', key: 'bay' },
  // { title: t('fields.arm'), dataIndex: 'baa_code', align: 'center', key: 'arm' },
  // { title: t('fields.arm'), dataIndex: 'baa_desc', align: 'center', key: 'arm' },
  { title: t('fields.arm'), dataIndex: 'baa_index', align: 'center', key: 'arm' },
  { title: t('fields.meter'), dataIndex: 'bam_code', align: 'center', key: 'meter' },
  {
    title: t('fields.flowing'),
    key: 'flowing',
    dataIndex: 'flowing',
    align: 'center',
    render: (flowing) => (
      <span>
        <Badge status={flowing === 'Y' ? 'processing' : 'warning'} />
        {flowing === 'Y' ? 'Active' : 'Inactive'}
      </span>
    ),
  },

  {
    title: t('fields.limiting'),
    key: 'high_flow_state',
    dataIndex: 'high_flow_state',
    align: 'center',
    render: (state) => (
      <span>
        <Badge status={state === '0' ? 'warning' : 'processing'} />
        {state === '0' ? 'Inactive' : state === '1' ? '1st High Flow' : '2nd High Flow'}
      </span>
    ),
  },

  {
    title: `${t('fields.flowContribution')} (${t('units.lpm')})`,
    dataIndex: 'flow_contribution',
    key: 'flow_contribution',
    align: 'center',
    render: (value) => <span>{value.toFixed(2)}</span>,
  },

  {
    title: `${t('fields.actualFlowRate')} (${t('units.lpm')})`,
    key: 'current_flow_rate',
    dataIndex: 'current_flow_rate',
    align: 'center',
    render: (value) => <span>{value.toFixed(2)}</span>,
  },
  {
    title: t('fields.loadedQuantity'),
    dataIndex: 'loaded_qty',
    key: 'loaded_qty',
    align: 'center',
    render: (value) => <span>{value.toFixed(2)}</span>,
  },
  {
    title: t('fields.presetQuantity'),
    dataIndex: 'preset',
    key: 'preset',
    align: 'center',
    render: (value) => <span>{value.toFixed(2)}</span>,
  },
];

export default columns;
