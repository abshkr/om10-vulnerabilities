import axios from "axios";
import api from "./api";

export function readTanks() {
  return axios.get(`https://${api}/api/pages/tank/read.php`);
}

export function readTank(tank) {
  return axios.get(`https://${api}/api/pages/tank/read.php?tank_code=${tank}`);
}

export function readBaseList() {
  return axios.get(`https://${api}/api/pages/tank/base_list.php`);
}

export function createTank(payload) {
  return axios.post(`https://${api}/api/pages/tank/create.php`, payload);
}

export function updateTank(payload) {
  return axios.post(`https://${api}/api/pages/tank/update.php`, payload);
}

export function deleteTank(tank) {
  return axios.post(`https://${api}/api/pages/tank/delete.php?tank_code=${tank}`);
}

export function readTankInventory() {
  return axios.get(`https://${api}/api/pages/tank_inv/read.php`);
}
