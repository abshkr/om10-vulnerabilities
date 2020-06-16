import React, { useEffect } from 'react';
import useSWR from 'swr';

import columns from './columns';
import { JOURNAL } from '../../../api';
import { DataTable } from '../../../components';

const Historical = ({ t, start, end, setData, setFields }) => {
  const { data: payload, isValidating } = useSWR(`${JOURNAL.SEARCH}?start_date=${start}&end_date=${end}`);

  const fields = columns(t);

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      setFields(fields);
    }
  }, [payload]);

  return <DataTable columns={columns(t)} data={payload?.records} isLoading={isValidating} />;
};

export default Historical;
