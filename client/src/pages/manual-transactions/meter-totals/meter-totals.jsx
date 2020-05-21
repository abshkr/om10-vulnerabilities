import React from 'react';

import { useTranslation } from 'react-i18next';

import { DataTable } from '../../../components';
import columns from './columns';

const MeterTotals = ({ form }) => {
  const { t } = useTranslation();

  const fields = columns(t);

  return <DataTable data={[]} height="80vh" columns={fields} />;
};

export default MeterTotals;
