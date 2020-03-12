import React from 'react';
import { Button } from 'antd';

const columns = t => [
  {
    title: t('fields.name'),
    dataIndex: 'report',
    key: 'report'
  },
  {
    title: t('fields.action'),
    dataIndex: 'link',
    key: 'link',
    align: 'right',
    render: text => (
      <Button size="small" type="default" onClick={() => window.open(text)}>
        {t('operations.download')}
      </Button>
    )
  }
];

export default columns;
