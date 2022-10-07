import { useState, useEffect } from 'react';
import _ from 'lodash';

import useSWR from 'swr';
import jwtDecode from 'jwt-decode';

import { USER_COLUMNS } from '../api';

const usePageColumns = (pageCode = '-1') => {
  const [pageColumns, setPageColumns] = useState([]);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const siteCode = decoded?.site_code;
  const userCode = decoded?.per_code;

  const url = `${USER_COLUMNS.READ_BY_USER}?user_code=${userCode}&site_code=${siteCode}&page_code=${pageCode}`;
  const { data: columns } = useSWR(url, { revalidateOnFocus: false });

  useEffect(() => {
    if (columns?.records) {
      setPageColumns(columns?.records);
    }
  }, [columns]);

  return { pageColumns };
};

export default usePageColumns;
