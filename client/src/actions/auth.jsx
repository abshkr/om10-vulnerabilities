import axios from 'axios';
import { hash } from '../utils';

import { AUTHORIZED, UNAUTHORIZED } from './types';
import { AUTH } from '../api';

export const login = (values, callback) => async (dispatch) => {
  const payload = hash(values.language, values.code, values.password);

  try {
    axios
      .post(AUTH.LOGIN, payload)
      .then((response) => {
        const token = response.data.token;

        if (token) {
          dispatch({ type: AUTHORIZED, payload: response.data.token });

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
  axios
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
