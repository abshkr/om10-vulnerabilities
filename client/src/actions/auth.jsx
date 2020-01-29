import axios from 'axios';
import { AUTHORIZED, UNAUTHORIZED } from './types';

export const login = (values, callback) => async dispatch => {
  try {
    axios
      .post('/api/login.php', {
        user: values.code,
        password: values.password
      })
      .then(response => {
        dispatch({ type: AUTHORIZED, payload: response.data.token });
        sessionStorage.setItem('token', response.data.token);

        callback(response);
      })
      .catch(error => {
        dispatch({ type: UNAUTHORIZED, payload: 'Invalid login credentials' });

        callback(error.response);
      });
  } catch (e) {
    dispatch({ type: UNAUTHORIZED, payload: 'Invalid login credentials' });
  }
};

export const update = () => async dispatch => {
  const rand = Math.random()
    .toString(36)
    .substring(7);

  dispatch({ type: AUTHORIZED, payload: rand });
  sessionStorage.setItem('token', rand);
};

export const signout = () => {
  sessionStorage.removeItem('token');

  return {
    type: AUTHORIZED,
    payload: ''
  };
};
