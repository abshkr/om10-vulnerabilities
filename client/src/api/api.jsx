import Axios from 'axios';
import authStore from '../stores/auth-store';

const token = authStore.getState()?.auth?.authenticated;

const api = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

export default api;
