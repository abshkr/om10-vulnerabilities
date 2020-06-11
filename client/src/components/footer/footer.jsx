import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { FooterContainer } from './style';

const Footer = () => {
  const [time, setTime] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = moment().format('DD/MM/YYYY HH:mm:ss');

      setTime(current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FooterContainer>
        <div>
          Server Time: <span>{time || 'Loading...'}</span>
        </div>

        <div style={{ textAlign: 'right' }}>
          Logged In As : <span>{time || 'Loading...'}</span>
        </div>
      </FooterContainer>
    </>
  );
};

export default Footer;
