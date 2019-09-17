import React from 'react';
import { Tag, Icon } from 'antd';
import { generateOptions, validateDateTime, convertToLocale } from '../../utils';

const columns = (data, t) => [
  {
    title: t('fields.id'),
    dataIndex: 'eqpt_id',
    key: 'eqpt_id',
    width: 100,
    align: 'center',
    onFilter: (value, record) => record.eqpt_id.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_id.localeCompare(b.eqpt_id),
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: t('fields.code'),
    dataIndex: 'eqpt_code',
    key: 'eqpt_code',
    onFilter: (value, record) => record.eqpt_code.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_code.localeCompare(b.eqpt_code),
    width: 200
  },
  {
    title: t('fields.title'),
    dataIndex: 'eqpt_title',
    key: 'eqpt_title',
    onFilter: (value, record) => record.eqpt_title.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_title.localeCompare(b.eqpt_title),
    width: 200
  },
  {
    title: t('fields.activeTanker'),
    dataIndex: 'eqpt_tanker',
    key: 'eqpt_tanker',
    onFilter: (value, record) => record.eqpt_tanker.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_tanker.localeCompare(b.eqpt_tanker),
    width: 200
  },
  {
    title: t('fields.owner'),
    dataIndex: 'eqpt_owner_name',
    key: 'eqpt_owner_name',
    width: 350,
    filters: generateOptions(data, 'eqpt_owner_name'),
    onFilter: (value, record) => record.eqpt_owner_name.indexOf(value) === 0
  },
  {
    title: t('fields.equipmentType'),
    dataIndex: 'eqpt_etp_title',
    key: 'eqpt_etp_title',
    filters: generateOptions(data, 'eqpt_etp_title'),
    width: 200
  },
  {
    title: t('fields.locked'),
    dataIndex: 'eqpt_lock',
    key: 'eqpt_lock',
    align: 'center',
    width: 60,
    render: text => (
      <span>
        <Icon type={text === 'Y' ? 'lock' : 'unlock'} />
      </span>
    )
  },
  {
    title: t('fields.loadType'),
    dataIndex: 'eqpt_load_type_name',
    key: 'eqpt_load_type_name',
    align: 'center',
    width: 120,
    filters: generateOptions(data, 'eqpt_load_type_name'),
    render: text => (
      <span>
        <Tag color="blue">{text}</Tag>
      </span>
    )
  },
  {
    title: t('fields.mustTareIn'),
    dataIndex: 'eqp_must_tare_in',
    align: 'center',
    key: 'eqp_must_tare_in',
    onFilter: (value, record) => record.eqp_must_tare_in.indexOf(value) === 0,
    sorter: (a, b) => a.eqp_must_tare_in.localeCompare(b.eqp_must_tare_in),
    width: 150,
    render: text => (
      <span>
        <Icon
          type={text === 'N' ? 'close' : 'check'}
          style={{ color: text === 'N' ? '#ec6e68' : '#a4ec68' }}
        />
      </span>
    )
  },
  {
    title: t('fields.lastModified'),
    dataIndex: 'eqpt_last_modified',
    key: 'eqpt_last_modified',
    align: 'center',
    width: 250,
    sorter: (a, b) =>
      validateDateTime(b.eqpt_last_modified) - validateDateTime(a.eqpt_last_modified),

    render: text => (
      // eslint-disable-next-line
      <a>{convertToLocale(text)}</a>
    )
  },
  {
    title: t('fields.lastUsed'),
    dataIndex: 'eqpt_last_used',
    key: 'eqpt_last_used',
    align: 'center',
    width: 250,
    sorter: (a, b) => validateDateTime(b.eqpt_last_used) - validateDateTime(a.eqpt_last_used),

    render: text => (
      // eslint-disable-next-line
      <a>{convertToLocale(text)}</a>
    )
  }
];

export default columns;
