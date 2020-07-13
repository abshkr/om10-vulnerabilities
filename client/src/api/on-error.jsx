import React from 'react';
import { notification, Button } from 'antd';

import { LOG_OUT } from 'constants/routes';

const onError = (err, key, config) => {
  const code = err?.response?.status;

  const btn = (
    <Button type="primary" size="small" onClick={() => (window.location.pathname = LOG_OUT)}>
      Log Out
    </Button>
  );

  if (code !== 498) {
    const key = 'force_logout';

    notification.error({
      duration: 0,
      message: 'Session has Expired.',

      description: 'Please Login again to continue.',
      btn,
      key,
    });
  }
  return null;
};

export default onError;
