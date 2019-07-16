/**
 * https://10.1.10.66/api/pages/equipment/read.php
 * https://10.1.10.66/api/pages/equipment/areas.php
 * https://10.1.10.66/api/pages/equipment/expiry_types.php
 * https://10.1.10.66/api/pages/equipment/owners.php
 * https://10.1.10.66/api/pages/equipment/eqpt_types.php
 * https://10.1.10.66/api/pages/equipment/eqpt_types.php?etyp_title=E&cmptnu=8
 * https://10.1.10.66/api/pages/equipment/search.php?eqpt_code=NDE
 * https://10.1.10.66/api/pages/equipment/search.php?eqpt_code=NDE&eqpt_owner=69002511&eqpt_etp=2400&start_num=1&end_num=10
 * https://10.1.10.66/api/pages/equipment/load_types.php
 * https://10.1.10.66/api/pages/equipment/compartments.php?eqpt_id=486357
 * https://10.1.10.66/api/pages/equipment/toggle_lock.php?eqpt_id=486357&cmptnu=1
 * https://10.1.10.66/api/pages/equipment/update.php?eqpt_id=992816774&eqpt_title=TAH7768&eqpt_area=1&eqpt_load_type=B&eqpt_empty_kg=233&pull_limit=344&eqpt_comments=comments&eqpt_lock=Y&eqp_must_tare_in=Y&EQPT_EXPIRY_DATE_1=2028-10-28%2021:41:36
 * https://10.1.10.66/api/pages/equipment/etyp_compartments.php?etyp_id=1300
 * https://10.1.10.66/api/pages/equipment/create.php?eqpt_code=TT3&eqpt_title=TT3&eqpt_owner=68002470&eqpt_etp=1300&eqpt_area=1&eqpt_load_type=B&eqpt_empty_kg=234&pull_limit=344&eqpt_comments=comments&eqpt_lock=Y&eqp_must_tare_in=Y&EQPT_EXPIRY_DATE_1=2028-10-28%2021:41:35
 * https://10.1.10.66/api/pages/equipment/delete.php?eqpt_id=992816750
 */

import axios from "axios";
import api from "./api";

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

export function toggleLock(id, state) {
  return axios.get(`https://${api}/api/pages/equipment/toggle_lock.php?eqpt_id=${id}&cmptnu=${state}`);
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
