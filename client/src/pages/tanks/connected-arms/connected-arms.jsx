import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

import { DataTable } from '../../../components';

import columns from './columns';

const ConnectedArms = ({ arms }) => {
  const { t } = useTranslation();

  const fields = columns(t);

  return (
    <Card hoverable>
      <DataTable columns={fields} data={arms} height="305px" />
    </Card>
  );
};

export default ConnectedArms;
