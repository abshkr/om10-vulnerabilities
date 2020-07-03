import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import columns from './columns';
import { JOURNAL } from '../../../api';
import { DataTable } from '../../../components';
import api from 'api';

const Historical = ({ t, start, end, setData, setFields, search }) => {
  const { data: payload, isValidating, revalidate } = useSWR(`${JOURNAL.READ}?start_date=${start}&end_date=${end}`);
  
  const [localData, setLocalData] = useState([]);

  const fields = columns(t);

  const doSearch = (values) => {
    api
      .get(JOURNAL.SEARCH, {
        params: values,
      })
      .then((res) => {
        // setCompartments(res.data.records);
        setLocalData(res.data.records);
        setData(res.data.records);
      });
  };

  useEffect(() => {
    if (!!search) {
      doSearch(search);
    } else {
      revalidate();
    }
  }, [search]);

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      setLocalData(payload?.records);
      setFields(fields);
      payload.records = null;
    }
  }, [payload]);

  return <DataTable columns={columns(t)} data={localData} isLoading={isValidating} />;
};

export default Historical;
