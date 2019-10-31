import axios from 'axios';

export function readPhysicalPrinters() {
  return axios.get(`/api/pages/physical_printer/read.php`);
}

export function createPhysicalPrinters(payload) {
  return axios.post(`/api/pages/physical_printer/create.php`, payload);
}

export function updatePhysicalPrinters(payload) {
  return axios.post(`/api/pages/physical_printer/update.php`, payload);
}

export function deletePhysicalPrinters(payload) {
  return axios.post(`/api/pages/physical_printer/delete.php`, payload);
}

export function readPrinterAreas() {
  return axios.get(`/api/pages/physical_printer/areas.php`);
}
