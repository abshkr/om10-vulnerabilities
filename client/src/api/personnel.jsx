import axios from 'axios';

export function readPersonnel() {
  return axios.get(`/api/pages/personnel/read.php`);
}

export function readPersonnelRoles() {
  return axios.get(`/api/pages/personnel/roles.php`);
}

export function readPersonnelEmployers() {
  return axios.get(`/api/pages/personnel/employers.php`);
}

export function readPersonnelTimeCodes() {
  return axios.get(`/api/pages/personnel/time_codes.php`);
}

export function readPersonnelAreaAccess(payload) {
  return axios.get(`/api/pages/personnel/area_accesses.php?per_code=${payload}`);
}

export function readPersonnelExpiryTypes() {
  return axios.get(`/api/pages/personnel/expiry_types.php`);
}

export function readPersonnelAreas() {
  return axios.get(`/api/pages/personnel/areas.php`);
}

export function createPersonnel(payload) {
  return axios.post(`/api/pages/personnel/create.php`, payload);
}

export function updatePersonnel(payload) {
  return axios.post(`/api/pages/personnel/update.php`, payload);
}

export function updatePersonnelPassword(code, password) {
  return axios.post(
    `/api/pages/personnel/update_password.php?per_code=${code}&password=${password}`,
  );
}

export function deletePersonnel(payload) {
  return axios.post(`/api/pages/personnel/delete.php`, payload);
}
