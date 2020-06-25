import { hash } from '../utils';

import { AUTHORIZED, UNAUTHORIZED } from './types';
import api, { AUTH } from '../api';

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
    .post(AUTH.LOGOUT, {
      token: sessionStorage.getItem('token'),
    })
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
