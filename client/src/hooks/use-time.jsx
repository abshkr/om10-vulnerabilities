import { useState, useEffect } from 'react';
import moment from 'dayjs';
import useSWR from 'swr';

import { AUTH } from '../api';
import { SETTINGS } from '../constants';

const useTime = () => {
  const { data: session } = useSWR(AUTH.SESSION);

  const [timeConfig, setTimeConfig] = useState({
    serverTime: moment(),
    clientTime: moment(),
    format: 'DD/MM/YYYY HH:mm:ss',
    offset: '00:00',
  });

  useEffect(() => {
    if (session?.records?.date) {
      setTimeConfig((current) => {
        return {
          ...current,
          serverTime: moment(session?.records.date, SETTINGS.DATE_TIME_FORMAT),
          offset: session?.records?.time_zone,
        };
      });
    }
  }, [session]);

  return timeConfig;
};

export default useTime;
