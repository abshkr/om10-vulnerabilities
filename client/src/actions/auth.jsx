import { AUTHORIZED, UNAUTHORIZED } from './types';

export const login = (values, callback) => async dispatch => {
  try {
    dispatch({ type: AUTHORIZED, payload: `${values.code}${values.password}` });
    sessionStorage.setItem('token', `${values.code}${values.password}`);
    callback();
  } catch (e) {
    dispatch({ type: UNAUTHORIZED, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  sessionStorage.removeItem('token');

  return {
    type: AUTHORIZED,
    payload: ''
  };
};
