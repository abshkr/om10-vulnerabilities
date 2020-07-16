import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ConfigStore from 'stores/config-store';
import jwtDecode from 'jwt-decode';

const Status = () => {
  const { t } = useTranslation();
  const { authenticated } = useSelector((state) => state.auth);
  const { id, offset, dateTimeFormat } = useContext(ConfigStore);
  
  const [user, setUser] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (offset) {
        const current = moment().utcOffset(offset).format(dateTimeFormat);

        setTime(current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [offset]);

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
