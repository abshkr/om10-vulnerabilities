import React from 'react';
import { Icon } from 'antd';

const columns = t => [
  {
    title: t('fields.menuItem'),
    dataIndex: 'object_text',
    key: 'object_text',
    width: '50%'
  },
  {
    title: t('fields.view'),
    dataIndex: 'priv_view',
    key: 'priv_view',
    align: 'center',
    render: value => (
      <Icon
        style={{ fontSize: 20, color: value ? '#52c41a' : '#ec6e68' }}
        type={value ? 'check-circle' : 'close-circle'}
      />
    )
  },
  {
    title: t('fields.update'),
    dataIndex: 'priv_update',
    key: 'priv_update',
    align: 'center',
    render: value => (
      <Icon
        style={{ fontSize: 20, color: value ? '#52c41a' : '#ec6e68' }}
        type={value ? 'check-circle' : 'close-circle'}
      />
    )
  },
  {
    title: t('fields.create'),
    dataIndex: 'priv_create',
    key: 'priv_create',
    align: 'center',
    render: value => (
      <Icon
        style={{ fontSize: 20, color: value ? '#52c41a' : '#ec6e68' }}
        type={value ? 'check-circle' : 'close-circle'}
      />
    )
  },
  {
    title: t('fields.delete'),
    dataIndex: 'priv_delete',
    key: 'priv_delete',
    align: 'center',
    render: value => (
      <Icon
        style={{ fontSize: 20, color: value ? '#52c41a' : '#ec6e68' }}
        type={value ? 'check-circle' : 'close-circle'}
      />
    )
  },

  {
    title: t('fields.password'),
    dataIndex: 'priv_protect',
    key: 'priv_protect',
    align: 'center',
    render: value => (
      <Icon
        style={{ fontSize: 20, color: value ? '#52c41a' : '#ec6e68' }}
        type={value ? 'check-circle' : 'close-circle'}
      />
    )
  }
];

export default columns;
