import axios from 'axios';

export function readTanks() {
  return axios.get(`/api/pages/tank/read.php`);
}

export function readBaseList() {
  return axios.get(`/api/pages/tank/base_list.php`);
}

export function createTank(payload) {
  return axios.post(`/api/pages/tank/create.php`, payload);
}

export function updateTank(payload) {
  return axios.post(`/api/pages/tank/update.php`, payload);
}

export function deleteTank(payload) {
  return axios.post(`/api/pages/tank/delete.php`, payload);
}

export function readTankInventory() {
  return axios.get(`/api/pages/tank_inv/read.php`);
}

export function readTank(payload) {
  return axios.get(`/api/pages/tank_status/read.php?tank_code=${payload}`);
}
