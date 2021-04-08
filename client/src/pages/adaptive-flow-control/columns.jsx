import React from 'react';
import { Tag, Progress } from 'antd';
import { generateOptions } from '../../utils';

const columns = (data, t) => [
  {
    title: t('fields.tankCode'),
    dataIndex: 'tankCode',
    key: 'tankCode',
    width: 160,
    align: 'center',
    render: (tank) => (
      <span>
        <Tag color="green">{tank}</Tag>
      </span>
    ),
  },
  {
    title: t('fields.baseProductCode'),
    dataIndex: 'baseCode',
    key: 'baseCode',
    width: 200,
    align: 'center',
    // eslint-disable-next-line
    render: (text) => <a>{text}</a>,
  },
  {
    title: t('fields.baseProductName'),
    dataIndex: 'baseName',
    key: 'baseName',
    width: 250,
    align: 'center',
    filters: generateOptions(data, 'baseName'),
    onFilter: (value, record) => record.baseName.indexOf(value) === 0,
  },

  {
    title: t('fields.enabled'),
    dataIndex: 'enabled',
    key: 'enabled',
    width: 120,
    align: 'center',
    render: (enabled) => (
      <span>
        <Tag color={enabled ? 'green' : 'error'}>{enabled ? 'True' : 'False'}</Tag>
      </span>
    ),
  },

  {
    title: t('fields.armPriority'),
    dataIndex: 'armPriority',
    key: 'armPriority',
    align: 'center',
    filters: generateOptions(data, 'armPriority'),
    width: 250,
    onFilter: (value, record) => record.armPriority.indexOf(value) === 0,
  },
  {
    title: t('fields.tankLevel'),
    dataIndex: 'level',
    key: 'level',
    width: 160,
    align: 'center',
  },
  {
    title: t('fields.currentFlowRate'),
    dataIndex: 'currentFlowRate',
    key: 'currentFlowRate',
    width: 150,
    align: 'center',
    render: (value) => (
      <span>
        {value} {t('units.lpm')}
      </span>
    ),
  },

  {
    title: t('fields.maxFlowRate'),
    dataIndex: 'max',
    key: 'max',
    width: 150,
    align: 'center',
    render: (value) => (
      <span>
        {value} {t('units.lpm')}
      </span>
    ),
  },
  {
    title: t('fields.flowRate%'),
    dataIndex: 'flowRate',
    key: 'flowRate',
    align: 'center',
    width: '20%',
    render: (percentage) => (
      <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
        <Progress
          // percent={percentage > 100 ? 100 : percentage}
          percent={percentage}
          strokeColor={percentage > 100 ? '#ec6e68' : '#00A454'}
          strokeWidth={6}
          // if using exception, the percentage won't be showed
          status={percentage > 100 ? 'active' : 'normal'}
          trailColor={'#e0e0e0'}
          // Please note: Progress will adjust the "percentage" to <= 100 into "percent",
          // so do not use Progress's "percent" attribute for display purpose
          format={(percent) => `${percentage}%`}
        />
      </div>
    ),
  },
];

export default columns;
