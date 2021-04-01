import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';
import useSWR from 'swr';

import { FSC_STATUS } from 'api';

export default function useMode() {
  const { data } = useSWR(FSC_STATUS.CHECK_FSC);

  const [mode, setMode] = useState({
    isFSC: false,
  });

  useEffect(() => {
    if (data && data?.is_fsc !== mode) {
      setMode({
        isFSC: data?.is_fsc,
      });
    }
  }, [data]);

  useEffect(() => {
    if (mode.isFSC) {
      message.warning({
        key: 'IS_FSC',
        content: 'Application Currently Running in FSC Mode.',
        duration: 2,
      });
    }
  }, [mode]);

  return mode;
}
