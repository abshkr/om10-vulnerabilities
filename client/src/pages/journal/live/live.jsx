import React from 'react';
import useSWR from 'swr';

import columns from './columns';
import { JOURNAL } from '../../../api';
import { DataTable } from '../../../components';

const Live = ({ t }) => {
  const { data: payload, isValidating } = useSWR(JOURNAL.READ, { refreshInterval: 1000 });

  return <DataTable columns={columns(t)} data={payload?.records} isLoading={isValidating} />;
};

export default Live;
