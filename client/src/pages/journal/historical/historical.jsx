import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import columns from './columns';
import usePagination from 'hooks/use-pagination';

import { JOURNAL } from '../../../api';
import { DataTable } from '../../../components';
import api from 'api';

const Historical = ({ t, start, end, setData, setFields, search }) => {
  const [localData, setLocalData] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const { setCount, take, offset, paginator } = usePagination(500);

  const { data: payload, isValidating, revalidate } = useSWR(search ? null :
      `${JOURNAL.READ}?start_date=${start}&end_date=${end}&start_num=${take}&end_num=${offset}${
        sortBy ? `&sort_by=${sortBy}` : ''
      }`
    );

  const fields = columns(t);

  const doSearch = (values) => {
    console.log(values);

    api
      .get(JOURNAL.SEARCH, {
        params: values,
      })
      .then((res) => {
        setCount(res?.data?.count);
        setLocalData(res.data.records);
        setData(res.data.records);
      });
  };

  useEffect(() => {
    if (!!search) {
      doSearch(search);
    }
  }, [search]);

  useEffect(() => {
    if (payload?.records) {
      setCount(payload?.count || 0);
      setData(payload?.records);
      setLocalData(payload?.records);
      setFields(fields);
      payload.records = null;
    }
  }, [payload]);

  return (
    <>
      <DataTable
        height="295px"
        columns={columns(t)}
        data={localData}
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
        {paginator}
      </div>
    </>
  );
};

export default Historical;
