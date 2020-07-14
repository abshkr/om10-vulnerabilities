import { message } from 'antd';
import _ from 'lodash';

import { LOG_OUT } from 'constants/routes';

const onTimeOut = () => {
  message
    .loading({
      key: 'loading',
      duration: 2,
      content: 'Session Expired. Safely Logging Out',
    })

    .then(() => {
      message
        .warning({
          key: 'warn',
          content: 'User Logged Out Safely. Please login again to continue.',
          duration: 1,
        })
        .then(() => (window.location.pathname = LOG_OUT));
    });
};

const onError = (err, key, config) => {
  const code = err?.response?.status;

  if (code === 498) {
    onTimeOut();
  }
  return null;
};

export default onError;
