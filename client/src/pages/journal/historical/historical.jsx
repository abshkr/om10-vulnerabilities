import React from 'react';
import useSWR from 'swr';

import columns from './columns';
import { JOURNAL } from '../../../api';
import { DataTable } from '../../../components';

const Historical = ({ t, start, end }) => {
  const { data: payload, isValidating } = useSWR(`${JOURNAL.SEARCH}?start_date=${start}&end_date=${end}`);

  return <DataTable columns={columns(t)} data={payload?.records} isLoading={isValidating} />;
};

export default Historical;
