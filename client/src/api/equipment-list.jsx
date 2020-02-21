import axios from 'axios';

export function readEquipment() {
  return axios.get(`/api/pages/equipment/read.php`);
}

export function readAreas() {
  return axios.get(`/api/pages/equipment/areas.php`);
}

export function readExpiry() {
  return axios.get(`/api/pages/equipment/expiry_types.php`);
}

export function readOwners() {
  return axios.get(`/api/pages/equipment/owners.php`);
}

export function readEquipmentTypes() {
  return axios.get(`/api/pages/equipment/eqpt_types.php`);
}

export function readLoadTypes() {
  return axios.get(`/api/pages/equipment/load_types.php`);
}

export function readCompartments(id) {
  return axios.get(`/api/pages/equipment/compartments.php?eqpt_id=${id}`);
}

export function readCompartmentEquipment(id) {
  return axios.get(`/api/pages/equipment/etyp_compartments.php?etyp_id=${id}`);
}

export function toggleLocks(id) {
  return axios.get(`/api/pages/equipment/unlock_cmpts.php?eqpt_id=${id}`);
}

export function createEquipment(payload) {
  return axios.post(`/api/pages/equipment/create.php`, payload);
}

export function updateEquipment(payload) {
  return axios.post(`/api/pages/equipment/update.php`, payload);
}

export function deleteEquipment(payload) {
  return axios.post(`/api/pages/equipment/delete.php`, payload);
}

export const READ = '/api/pages/equipment/read.php';
export const CREATE = '/api/pages/equipment/create.php';
export const UPDATE = '/api/pages/equipment/update.php';
export const DELETE = '/api/pages/equipment/delete.php';
export const TOGGLE_LOCKS = '/api/pages/equipment/unlock_cmpts.php';

export const AREAS = '/api/pages/equipment/areas.php';
export const EXPIRY = '/api/pages/equipment/expiry_types.php';
export const OWNERS = '/api/pages/equipment/owners.php';
export const TYPES = '/api/pages/equipment/eqpt_types.php';
export const LOAD_TYPES = '/api/pages/equipment/load_types.php';
export const COMPARTMENTS = '/api/pages/equipment/compartments.php';
export const COMPARTMENT_EQUIPMENT = '/api/pages/equipment/etyp_compartments.php';
