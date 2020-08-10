import { message } from 'antd';
import _ from 'lodash';
import i18n from 'i18next';
import { LOG_OUT } from 'constants/routes';

const onTimeOut = () => {
  let executed = false;

  if (!executed) {
    message
      .loading({
        key: 'loading',
        duration: 2,
        content: i18n.t("messages.sessionExpired"),
        //content: 'Session Expired. Safely Logging Out',
      })

      .then(() => {
        message
          .warning({
            key: 'warn',
            content: i18n.t("messages.loggedOut"),
            //content: 'User Logged Out Safely. Please login again to continue.',
            duration: 1,
          })
          .then(() => {
            executed = true;

            window.location.pathname = LOG_OUT;
          });
      });
  }
};

const onError = (err, key, config) => {
  const errors = err?.response?.data?.errors;
  const code = errors?.length > 0 ? errors[0]?.code : 500;

  if (code === 498) {
    onTimeOut();
  }
};

export default onError;