import axios from 'axios';

export const read = () => {
  return axios.get(`/api/pages/idassignment/read.php`);
};

export const issuer = () => {
  return axios.get(`/api/pages/idassignment/issuers.php`);
};

export const assignmentTypes = () => {
  return axios.get(`/api/pages/idassignment/assignment_types.php`);
};

export const physicalTypes = () => {
  return axios.get(`/api/pages/idassignment/physical_types.php`);
};

export const roles = () => {
  return axios.get(`/api/pages/idassignment/roles.php`);
};

export const psn = () => {
  return axios.get(`/api/pages/idassignment/lookup_psn.php`);
};

export const lookupPSN = payload => {
  return axios.get(`/api/pages/idassignment/lookup_psn.php`, payload);
};

export const employers = () => {
  return axios.get(`/api/pages/idassignment/employers.php`);
};

export const kya = () => {
  return axios.get(`/api/pages/idassignment/kyatxt_list.php`);
};

export const drawers = () => {
  return axios.get(`/api/pages/idassignment/drawers.php`);
};

export const suppliers = () => {
  return axios.get(`/api/pages/idassignment/suppliers.php`);
};

export const carriers = () => {
  return axios.get(`/api/pages/idassignment/carriers.php`);
};

export const tankers = () => {
  return axios.get(`/api/pages/idassignment/tankers.php`);
};

export const tanker = payload => {
  return axios.get(`/api/pages/idassignment/tankers.php?tnkr_owner=${payload}`);
};

export const schedulables = () => {
  return axios.get(`/api/pages/idassignment/schedulables.php`);
};

export const schedulable = payload => {
  return axios.get(`/api/pages/idassignment/schedulables.php?owner=${payload}`);
};

export const nonSchedulables = () => {
  return axios.get(`/api/pages/idassignment/non_schedulables.php`);
};

export const nonSchedulable = payload => {
  return axios.get(`/api/pages/idassignment/non_schedulables.php?owner=${payload}`);
};

export const create = payload => {
  return axios.post(`/api/pages/idassignment/create.php`, payload);
};

export const update = payload => {
  return axios.post(`/api/pages/idassignment/update.php`, payload);
};

export const remove = payload => {
  return axios.post(`/api/pages/idassignment/delete.php`, payload);
};
