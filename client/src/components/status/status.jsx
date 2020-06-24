import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useAuth } from '../../hooks';
import auth from '../../auth';

const Status = ({ user }) => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = moment().format('DD/MM/YYYY HH:mm:ss');

      setTime(current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div style={{ fontSize: 12 }}>
        <strong>Server Time</strong>: <span>{time || 'Loading...'}</span>
      </div>

      <div style={{ fontSize: 12, textAlign: 'right' }}>
        <strong>Logged In As</strong>:{' '}
        <span>
          {user?.per_code || 'Loading...'} ({user?.site_code} /{user?.site_name})
        </span>
      </div>
    </>
  );
};

export default auth(Status);
