import Axios from 'axios';

const api = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: sessionStorage.getItem('token'),
  },
});

export default api;
