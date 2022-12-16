import api, { AUTH } from 'api';
import hash from 'utils/hash';

import { AUTHORIZED, UNAUTHORIZED } from './types';

export const login = (values, callback) => async (dispatch) => {
  const payload = hash(values.language, values.code, values.password);
  let url = AUTH.LOGIN;
  if (values?.auth_type === 'LDAP' || values?.auth_type === 'SAML') {
    payload.authmode = values?.auth_type;
    payload.plainpsw = values?.password;
    url = AUTH.LOGIN_MAIN;
  }

  try {
    api
      .post(url, payload)
      .then((response) => {
        const token = response.data.token;

        if (token) {
          if (
            parseInt(response.data.http_session_trace_count) >=
            parseInt(response.data.max_http_session_allowed)
          ) {
            response.data.killsession = true;
            callback(response, dispatch);
            return;
          } else if (response.data.user_status_flag === '0') {
            callback(response, dispatch);
            return;
          } else if (response.data.twofa_result === 'AUTH 2FA') {
            callback(response, dispatch);
            return;
          }
          sessionStorage.setItem('token', response.data.token);

          dispatch({ type: AUTHORIZED, payload: response.data.token });
        }

        dispatch({ type: UNAUTHORIZED, payload: 'Invalid login credentials' });
        callback(response);
      })
      .catch((error) => {
        callback(error.response);
      });
  } catch (e) {
    dispatch({ type: UNAUTHORIZED, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  api.post(AUTH.LOGOUT).then((reponse) => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('alarms');
  });

  return {
    type: AUTHORIZED,
    payload: '',
  };
};

export const refresh = (token) => async (dispatch) => {
  api
    .post(AUTH.REFRESH, {
      token,
    })
    .then((response) => {
      const newToken = response?.data?.access_token;

      if (newToken) {
        sessionStorage.setItem('token', newToken);

        dispatch({ type: AUTHORIZED, payload: newToken });
      }

      dispatch({ type: UNAUTHORIZED, payload: 'Invalid login credentials' });
    });
};

// if (response?.data?.user_status_flag === '0') {
//   const next = (payload) => {
//     if (payload) {
//       sessionStorage.setItem('token', payload);

//       dispatch({ type: AUTHORIZED, payload: payload });
//     }
//   };

//   Reset({
//     code: values.code,
//     response: response.data,
//     oldPassword: payload.psw,
//     language: values.language,
//     callback: next,
//   });
// } else { }
