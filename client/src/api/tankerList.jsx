import axios from "axios";
import api from "./api";

export function tankers() {
  return axios.get(`https://${api}/api/pages/tanker/read.php`);
}

export function owners() {
  return axios.get(`https://${api}/api/pages/tanker/owners.php`);
}

export function carriers() {
  return axios.get(`https://${api}/api/pages/tanker/carriers.php`);
}

export function equipmentTypes() {
  return axios.get(`https://${api}/api/pages/tanker/eqpt_types.php`);
}

export function terminal() {
  return axios.get(`https://${api}/api/pages/tanker/terminal.php`);
}

export function composition(id) {
  return axios.get(
    `https://${api}/api/pages/tanker/tnkr_composition.php?tnkr_code=${id}`
  );
}

export function typeComposition(id) {
  return axios.get(
    `https://${api}/api/pages/tanker/etyp_composition.php?etyp_id=${id}`
  );
}

export function expiry() {
  return axios.get(`https://${api}/api/pages/tanker/expiry_types.php`);
}

export function compartment(id) {
  return axios.get(
    `https://${api}/api/pages/tanker/eqpt_compartments.php?eqpt_id=${id}`
  );
}

export function toggleLock(id) {
  return axios.get(
    `https://${api}/api/pages/tanker/toggle_lock.php?eqpt_id=${id}`
  );
}

export function unlockAll(id) {
  return axios.get(
    `https://${api}/api/pages/tanker/unlock_all.php?tnkr_code=${id}`
  );
}

export function create(payload) {
  return axios.post(`https://${api}/api/pages/tanker/create.php`, payload);
}

export function update(payload) {
  return axios.post(`https://${api}/api/pages/tanker/update.php`, payload);
}

export function deleteTanker(id) {
  return axios.post(
    `https://${api}/api/pages/tanker/delete.php?tnkr_code=${id}`
  );
}
