import axios from 'axios';

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
