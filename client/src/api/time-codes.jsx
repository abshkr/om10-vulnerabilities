import axios from 'axios';

export const read = () => {
  return axios.get(`/api/pages/time_code/read.php`);
};

export const update = payload => {
  return axios.get(`/api/pages/time_code/update.php`, payload);
};
