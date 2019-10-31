import React from 'react';

const columns = t => [
  {
    title: t('fields.code'),
    dataIndex: 'per_code',
    key: 'per_code',
    align: 'center',
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: t('fields.name'),
    dataIndex: 'per_name',
    key: 'per_name',
    align: 'center'
  }
];

export default columns;
