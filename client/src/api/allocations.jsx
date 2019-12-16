import axios from 'axios';

export const read = () => {
  return axios.get(`/api/pages/allocs/read.php`);
};

export const types = () => {
  return axios.get(`/api/pages/allocs/types.php`);
};

export const locks = () => {
  return axios.get(`/api/pages/allocs/lock_types.php`);
};

export const period = () => {
  return axios.get(`/api/pages/allocs/period_types.php`);
};

export const suppliers = () => {
  return axios.get(`/api/pages/allocs/suppliers.php`);
};

export const drawers = () => {
  return axios.get(`/api/pages/allocs/drawers.php`);
};

export const carriers = () => {
  return axios.get(`/api/pages/allocs/carriers.php`);
};

export const customers = () => {
  return axios.get(`/api/pages/allocs/customers.php`);
};

export const items = payload => {
  return axios.post(`/api/pages/allocs/alloc_items.php`, payload);
};

export const create = payload => {
  return axios.post(`/api/pages/allocs/create.php`, payload);
};

export const update = payload => {
  return axios.post(`/api/pages/allocs/update.php`, payload);
};

export const remove = payload => {
  return axios.post(`/api/pages/allocs/delete.php`, payload);
};
