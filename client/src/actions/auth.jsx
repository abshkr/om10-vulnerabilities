import api, { AUTH } from 'api';
import hash from 'utils/hash';

import { AUTHORIZED, UNAUTHORIZED } from './types';

export const login = (values, callback) => async (dispatch) => {
  const payload = hash(values.language, values.code, values.password);

  try {
    api
      .post(AUTH.LOGIN, payload)
      .then((response) => {
        const token = response.data.token;

        if (token) {
          dispatch({ type: AUTHORIZED, payload: response.data.token });

          api.interceptors.request.use(function (config) {
            config.headers.Authorization = response.data.token;

            return config;
          });

          sessionStorage.setItem('token', response.data.token);
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
  api
    .post(AUTH.LOGOUT)
    .then((reponse) => {
      sessionStorage.removeItem('token');
    })
    .catch((error) => {
      sessionStorage.removeItem('token');
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
      const token = response?.data?.access_token;

      if (token) {
        dispatch({ type: AUTHORIZED, payload: token });

        api.interceptors.request.use(function (config) {
          config.headers.Authorization = token;

          return config;
        });

        sessionStorage.setItem('token', token);
      }

      dispatch({ type: UNAUTHORIZED, payload: 'Invalid login credentials' });
    });
};
