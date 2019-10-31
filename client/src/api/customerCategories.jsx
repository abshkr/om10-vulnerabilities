import axios from 'axios';

export function readCustomerCategories() {
  return axios.get(`/api/pages/cust_cat/read.php`);
}

export function createCustomerCategories(payload) {
  return axios.post(`/api/pages/cust_cat/create.php`, payload);
}

export function updateCustomerCategories(payload) {
  return axios.post(`/api/pages/cust_cat/update.php`, payload);
}

export function deleteCustomerCategories(payload) {
  return axios.post(`/api/pages/cust_cat/delete.php`, payload);
}
