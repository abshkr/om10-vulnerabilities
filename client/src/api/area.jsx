import axios from 'axios';

export function updateArea(payload) {
  return axios.post(`/api/pages/area/update.php`, payload);
}

export function createArea(payload) {
  return axios.post(`/api/pages/area/create.php`, payload);
}

export function deleteArea(payload) {
  return axios.post(`/api/pages/area/delete.php`, payload);
}

export function readArea() {
  return axios.get(`/api/pages/area/read.php`);
}
