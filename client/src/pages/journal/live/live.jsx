import React, { useEffect } from 'react';
import useSWR from 'swr';

import columns from './columns';
import { JOURNAL } from '../../../api';
import { DataTable } from '../../../components';

const Live = ({ t, setData, setFields }) => {
  const { data: payload, isValidating } = useSWR(JOURNAL.READ, { refreshInterval: 1000 });

  const fields = columns(t);

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      setFields(fields);
    }
  }, [payload]);

  return <DataTable columns={fields} data={payload?.records} isLoading={isValidating} />;
};

export default Live;
