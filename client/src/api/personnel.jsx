import axios from "axios";
import api from "./api";

export function readPersonnel() {
  return axios.get(`https://${api}/api/pages/personnel/read.php`);
}

export function readPersonnelRoles() {
  return axios.get(`https://${api}/api/pages/personnel/roles.php`);
}

export function readPersonnelEmployers() {
  return axios.get(`https://${api}/api/pages/personnel/employers.php`);
}

export function readPersonnelTimeCodes() {
  return axios.get(`https://${api}/api/pages/personnel/time_codes.php`);
}

export function readPersonnelAreaAccess(payload) {
  return axios.get(`https://${api}/api/pages/personnel/area_accesses.php?per_code=${payload}`);
}

export function readPersonnelExpiryTypes() {
  return axios.get(`https://${api}/api/pages/personnel/expiry_types.php`);
}

export function readPersonnelAreas() {
  return axios.get(`https://${api}/api/pages/personnel/areas.php`);
}

export function createPersonnel(payload) {
  return axios.post(`https://${api}/api/pages/personnel/create.php`, payload);
}

export function updatePersonnel(payload) {
  return axios.post(`https://${api}/api/pages/personnel/update.php`, payload);
}

export function updatePersonnelPassword(code, password) {
  return axios.post(`https://${api}/api/pages/personnel/update_password.php?per_code=${code}&password=${password}`);
}

export function deletePersonnel(payload) {
  return axios.post(`https://${api}/api/pages/personnel/delete.php?per_code=${payload}`);
}
