import Axios from 'axios';

const api = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },

  transformRequest: [
    function (data, headers) {
      headers['Authorization'] = sessionStorage.getItem('token');

      return JSON.stringify(data);
    },
  ],
});

export default api;
