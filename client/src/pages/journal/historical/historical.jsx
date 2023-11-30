import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import columns from './columns';
import columnsLive from '../live/columns';

import { DataTable, DataDownloader } from '../../../components';
import api from 'api';

const Historical = ({
  t,
  data,
  setData,
  setFields,
  url,
  pagingFlag,
  paginator,
  setCount,
  count,
  downloader,
  setDownloading,
  setSortBy,
}) => {
  const { data: payload, isValidating, mutate: revalidate } = useSWR(url, { revalidateOnFocus: false });

  const fields = pagingFlag ? columns(t) : columnsLive(t);

  useEffect(() => {
    if (payload?.records) {
      setCount(payload?.count || 0);
      setData(payload?.records);
      setFields(fields);
      payload.records = null;
    }
  }, [payload]);

  useEffect(() => {
    if (isValidating !== undefined) {
      setDownloading(isValidating);
    }
  }, [isValidating]);

  return (
    <>
      <DataTable
        height="295px"
        columns={fields}
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
        {pagingFlag ? paginator : downloader}
      </div>
    </>
  );
};

export default Historical;
