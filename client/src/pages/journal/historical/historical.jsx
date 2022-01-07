import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import columns from './columns';
import usePagination from 'hooks/use-pagination';

import { JOURNAL } from '../../../api';
import { DataTable } from '../../../components';
import api from 'api';

const Historical = ({ t, data, setData, setFields, url, pagingFlag, paginator, setCount, count }) => {
  const [sortBy, setSortBy] = useState(null);

  const { data: payload, isValidating, revalidate } = useSWR(url+`${sortBy ? `&sort_by=${sortBy}` : ''}`, { revalidateOnFocus: false });

  const fields = columns(t);

  useEffect(() => {
    if (payload?.records) {
      setCount(payload?.count || 0);
      setData(payload?.records);
      setFields(fields);
      payload.records = null;
    }
  }, [payload]);

  return (
    <>
      <DataTable
        height="295px"
        columns={columns(t)}
        data={data}
        isLoading={isValidating}
        onSortChanged={setSortBy}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        {pagingFlag ? paginator : t('fields.totalCount') + ': ' + count }
      </div>
    </>
  );
};

export default Historical;
