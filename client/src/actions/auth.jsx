import axios from 'axios';
import { AUTHORIZED, UNAUTHORIZED } from './types';
import { AUTH } from '../api';

export const login = (values, callback) => async (dispatch) => {
  try {
    axios
      .post(AUTH.LOGIN, {
        user: values.code,
        password: values.password,
      })
      .then((response) => {
        dispatch({ type: AUTHORIZED, payload: response.data.token });
        sessionStorage.setItem('token', response.data.token);

        callback(response);
      })
      .catch((error) => {
        dispatch({ type: UNAUTHORIZED, payload: 'Invalid login credentials' });

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
