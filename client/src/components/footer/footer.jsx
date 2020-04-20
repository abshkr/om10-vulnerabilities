import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FooterContainer } from './style';

const Footer = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = moment().format('DD/MM/YYYY HH:mm:ss');

      setTime(current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FooterContainer>
      Server Time: <span>{time || 'Loading...'}</span>
    </FooterContainer>
  );
};

export default Footer;
