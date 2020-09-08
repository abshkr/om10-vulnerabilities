import React, { Component } from 'react';
import { DataTable } from 'components';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

import columns from './columns';

const Summary = ({ data, isLoading }) => {
  const { t } = useTranslation();

  const fields = columns(t);

  return (
    <Card hoverable bodyStyle={{ padding: 5 }}>
      <DataTable data={data} isLoading={isLoading} columns={fields} height="400px" />
    </Card>
  );
};

export default Summary;
