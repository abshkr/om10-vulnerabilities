import axios from "axios";
import api from "./api";


export function updateArea(payload) {
  return axios.post(`https://${api}/api/pages/area/update.php`, payload);
}

export function createArea(payload) {
  return axios.post(`https://${api}/api/pages/area/create.php`, payload);
}

export function deleteArea(payload) {
  return axios.post(`https://${api}/api/pages/area/delete.php`, payload);
}

export function readArea() {
  return axios.get(`https://${api}/api/pages/area/read.php`);
}
