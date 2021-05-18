import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';
import useSWR from 'swr';

import api, { ROLE_ACCESS_MANAGEMENT } from '../../api';
import { SETTINGS } from '../../constants';
import ConfigStore from 'stores/config-store';
import jwtDecode from 'jwt-decode';

const Status = ({ isFSC }) => {
  const { t } = useTranslation();
  const { authenticated } = useSelector((state) => state.auth);
  const { id, offset, dateTimeFormat, serverTime } = useContext(ConfigStore);

  const { data: payload } = useSWR(ROLE_ACCESS_MANAGEMENT.VERSION);

  const [user, setUser] = useState(null);
  const [time, setTime] = useState(null);
  const [backendVersion, setBackendVersion] = useState('NA');

  useEffect(() => {
    const serverCurrent = moment(serverTime, SETTINGS.DATE_TIME_FORMAT);
    const diff = serverCurrent.diff(moment());
    const interval = setInterval(() => {
      if (serverTime) {
        const current = moment()
          .add(diff / 1000, 'seconds')
          .format(dateTimeFormat);

        setTime(current);
        sessionStorage.setItem(
          'serverDateTime',
          moment()
            .add(diff / 1000, 'seconds')
            .format(SETTINGS.DATE_TIME_FORMAT)
        );
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

  useEffect(() => {
    if (payload) {
      setBackendVersion(payload.records);
    }
  }, [payload]);

  return (
    <div style={{ display: 'flex' }}>
      {user === '9999' && backendVersion !== 'NA' && (
        <div style={{ width: '30vw', fontSize: 14, float: 'left', marginLeft: 10, paddingTop: 5 }}>
          <strong>
            <span>{backendVersion}</span>
          </strong>
        </div>
      )}

      <div
        style={{
          width: user === '9999' && backendVersion !== 'NA' ? '70vw' : '100vw',
          display: 'flex',
          justifyContent: 'flex-end',
          float: 'right',
          paddingTop: 5,
        }}
      >
        <div style={{ width: '230px', fontSize: 14, textAlign: 'left', marginRight: 10 }}>
          <strong>{t('fields.serverTime')}</strong>: <span>{time || '...'} </span>
        </div>

        <div style={{ fontSize: 14, textAlign: 'right', marginRight: 15 }}>
          <strong>{t('fields.loggedInAs')}</strong>:{' '}
          <span>
            {user || '...'} ({id})
          </span>
        </div>

        {isFSC && (
          <div style={{ fontSize: 14, textAlign: 'right', marginRight: 15 }}>
            <strong>{t('descriptions.currentlyInFSCMode')}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
