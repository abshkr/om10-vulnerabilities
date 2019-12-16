import axios from 'axios';

export const read = () => {
  return axios.get(`/api/pages/hazchem/read.php`);
};

export const create = payload => {
  return axios.post(`/api/pages/hazchem/create.php`, payload);
};

export const update = payload => {
  return axios.post(`/api/pages/hazchem/update.php`, payload);
};

export const remove = payload => {
  return axios.post(`/api/pages/hazchem/delete.php`, payload);
};
