import axios from "axios";

export function id() {
  return axios.get(`https://10.1.10.66/api/idassignment/count.php`);
}

export function issuer() {
  return axios.get(`https://10.1.10.66/api/idassignment/issuers.php`);
}

export function assignment() {
  return axios.get(`https://10.1.10.66/api/idassignment/assignment_types.php`);
}

export function physicalType() {
  return axios.get(`https://10.1.10.66/api/idassignment/physical_types.php`);
}

export function employer() {
  return axios.get(`https://10.1.10.66/api/idassignment/employers.php`);
}

export function role() {
  return axios.get(`https://10.1.10.66/api/idassignment/roles.php`);
}

export function personnel() {
  return axios.get(`https://10.1.10.66/api/idassignment/lookup_psn.php`);
}

export function drawer() {
  return axios.get(`https://10.1.10.66/api/idassignment/drawers.php`);
}

export function supplier() {
  return axios.get(`https://10.1.10.66/api/idassignment/suppliers.php`);
}

export function tanker() {
  return axios.get(`https://10.1.10.66/api/idassignment/tankers.php`);
}

export function equipmentCarrier() {
  return axios.get(`https://10.1.10.66/api/idassignment/carriers.php`);
}

export function transportEquipment(code) {
  return axios.get(`https://10.1.10.66/api/idassignment/schedulables.php?owner=${code}.php`);
}
