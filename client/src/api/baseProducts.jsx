import axios from "axios";
import api from "./api";

export function readBaseProduct() {
  return axios.get(`https://${api}/api/pages/base_prod/read.php`);
}

export function createBaseProduct(payload) {
  return axios.post(`https://${api}/api/pages/base_prod/create.php`, payload);
}

export function updateBaseProduct(payload) {
  return axios.post(`https://${api}/api/pages/base_prod/update.php`, payload);
}

export function deleteBaseProduct(tank) {
  return axios.post(`https://${api}/api/pages/base_prod/delete.php?base_code=${tank}`);
}
