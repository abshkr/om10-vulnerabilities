import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ConfigStore from 'stores/config-store';
import jwtDecode from 'jwt-decode';

const Status = () => {
  const { t } = useTranslation();
  const { authenticated } = useSelector((state) => state.auth);
  const { id, offset, dateTimeFormat, serverTime } = useContext(ConfigStore);
  
  const [user, setUser] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const serverCurrent = moment(serverTime, 'YYYY-MM-DD HH:mm:ss');
    const diff = serverCurrent.diff(moment())
    const interval = setInterval(() => {
      if (serverTime) {
        const current = moment().add(diff / 1000, 'seconds').format(dateTimeFormat);

        setTime(current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [serverTime]);

  useEffect(() => {
    if (authenticated) {
      try {
        const decoded = jwtDecode(authenticated);

        setUser(decoded?.per_code);
      } catch (error) {
        return;
      }
    }
  }, [authenticated]);

  return (
    <div style={{display: "flex", justifyContent: "flex-end", paddingTop: 5 }}>
        <div style={{ width:"230px", fontSize: 12, textAlign: 'left', marginRight: 10 }}>
          <strong>{t('fields.serverTime')}</strong>: <span>{time || '...'} </span>
        </div>
      
        <div style={{ fontSize: 12, textAlign: 'right', marginRight: 15}}>
          <strong>{t('fields.loggedInAs')}</strong>:{' '}
          <span>
            {user || '...'} ({id})
          </span>
      </div>
    </div>
  );
};

export default Status;
