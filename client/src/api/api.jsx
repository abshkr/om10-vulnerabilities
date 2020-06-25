import Axios from 'axios';
import authStore from '../stores/auth-store';

console.log(authStore.getState());

const api = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
