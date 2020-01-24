import axios from 'axios';

export const READ = '/api/pages/logical_printer/read.php';
export const USAGES = '/api/pages/logical_printer/usages.php';
export const COMPANYS = '/api/pages/logical_printer/companys.php';
export const PRINTERS = '/api/pages/logical_printer/printers.php';
export const READ_PHYSICAL = '/api/pages/physical_printer/read.php';

export const CREATE = '/api/pages/logical_printer/create.php';
export const UPDATE = '/api/pages/logical_printer/update.php';
export const DELETE = '/api/pages/logical_printer/delete.php';

export function readLogicalPrinters() {
  return axios.get(`/api/pages/logical_printer/read.php`);
}

export function usages() {
  return axios.get(`/api/pages/logical_printer/usages.php`);
}

export function companys() {
  return axios.get(`/api/pages/logical_printer/companys.php`);
}

export function printers() {
  return axios.get(`/api/pages/logical_printer/printers.php`);
}

export function createLogicalPrinters(payload) {
  return axios.post(`/api/pages/logical_printer/create.php`, payload);
}

export function updateLogicalPrinters(payload) {
  return axios.post(`/api/pages/logical_printer/update.php`, payload);
}

export function deleteLogicalPrinters(payload) {
  return axios.post(`/api/pages/logical_printer/delete.php`, payload);
}

export function readPhysicalPrinters() {
  return axios.get(`/api/pages/physical_printer/read.php`);
}
