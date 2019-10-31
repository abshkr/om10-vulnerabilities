import axios from 'axios';

export function tankers() {
  return axios.get(`/api/pages/tanker/read.php`);
}

export function owners() {
  return axios.get(`/api/pages/tanker/owners.php`);
}

export function carriers() {
  return axios.get(`/api/pages/tanker/carriers.php`);
}

export function equipmentTypes() {
  return axios.get(`/api/pages/tanker/eqpt_types.php`);
}

export function terminal() {
  return axios.get(`/api/pages/tanker/terminal.php`);
}

export function composition(id) {
  return axios.get(`/api/pages/tanker/tnkr_composition.php?tnkr_code=${id}`);
}

export function typeComposition(id) {
  return axios.get(`/api/pages/tanker/etyp_composition.php?etyp_id=${id}`);
}

export function expiry() {
  return axios.get(`/api/pages/tanker/expiry_types.php`);
}

export function compartment(id) {
  return axios.get(`/api/pages/tanker/eqpt_compartments.php?eqpt_id=${id}`);
}

export function toggleLock(id) {
  return axios.get(`/api/pages/tanker/toggle_lock.php?eqpt_id=${id}`);
}

export function unlockAll(id) {
  return axios.get(`/api/pages/tanker/unlock_all.php?tnkr_code=${id}`);
}

export function create(payload) {
  return axios.post(`/api/pages/tanker/create.php`, payload);
}

export function update(payload) {
  return axios.post(`/api/pages/tanker/update.php`, payload);
}

export function deleteTanker(payload) {
  return axios.post(`/api/pages/tanker/delete.php`, payload);
}
