import axios from "axios";
import api from "./api";

export function readCustomerCategories() {
  return axios.get(`https://${api}/api/pages/cust_cat/read.php`);
}

export function createCustomerCategories(payload) {
  return axios.post(`https://${api}/api/pages/cust_cat/create.php`, payload);
}

export function updateCustomerCategories(payload) {
  return axios.post(`https://${api}/api/pages/cust_cat/update.php`, payload);
}

export function deleteCustomerCategories(tank) {
  return axios.post(`https://${api}/api/pages/cust_cat/delete.php?base_code=${tank}`);
}
