import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { FooterContainer, StatusContainer } from './style';
import { Badge } from 'antd';

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
    <>
      <FooterContainer>
        Server Time: <span>{time || 'Loading...'}</span>
      </FooterContainer>
      <StatusContainer>
        <Badge style={{ marginLeft: 10, marginRight: 10 }} status="success" text="Fully Functional" />
        <Badge style={{ marginRight: 10 }} status="warning" text="Partially Functional" />
        <Badge style={{ marginRight: 10 }} status="error" text="Unavailable" />
      </StatusContainer>
    </>
  );
};

export default Footer;
