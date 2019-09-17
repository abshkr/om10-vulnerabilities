import axios from 'axios';
import api from './api';

export function readEquipment() {
  return axios.get(`https://${api}/api/pages/equipment/read.php`);
}

export function readAreas() {
  return axios.get(`https://${api}/api/pages/equipment/areas.php`);
}

export function readExpiry() {
  return axios.get(`https://${api}/api/pages/equipment/expiry_types.php`);
}

export function readOwners() {
  return axios.get(`https://${api}/api/pages/equipment/owners.php`);
}

export function readEquipmentTypes() {
  return axios.get(`https://${api}/api/pages/equipment/eqpt_types.php`);
}

export function readLoadTypes() {
  return axios.get(`https://${api}/api/pages/equipment/load_types.php`);
}

export function readCompartments(id) {
  return axios.get(`https://${api}/api/pages/equipment/compartments.php?eqpt_id=${id}`);
}

export function readCompartmentEquipment(id) {
  return axios.get(`https://${api}/api/pages/equipment/etyp_compartments.php?etyp_id=${id}`);
}

export function toggleLocks(id) {
  return axios.get(`https://${api}/api/pages/equipment/toggle_lock.phps?eqpt_id=${id}`);
}

export function createEquipment(payload) {
  return axios.post(`https://${api}/api/pages/equipment/create.php`, payload);
}

export function updateEquipment(payload) {
  return axios.post(`https://${api}/api/pages/equipment/update.php`, payload);
}

export function deleteEquipment(id) {
  return axios.post(`https://${api}/api/pages/equipment/delete.php?eqpt_id=${id}`);
}

export const getEquipmentImage = `https://${api}/api/assets/`;
