import axios from "axios";
import api from "./api";

export function readLogicalPrinters() {
  return axios.get(`https://${api}/api/pages/logical_printer/read.php`);
}

export function createLogicalPrinters(payload) {
  return axios.post(`https://${api}/api/pages/logical_printer/create.php`, payload);
}

export function updateLogicalPrinters(payload) {
  return axios.post(`https://${api}/api/pages/logical_printer/update.php`, payload);
}

export function deleteLogicalPrinters(payload) {
  return axios.post(`https://${api}/api/pages/logical_printer/delete.php`, payload);
}

export function readPhysicalPrinters() {
  return axios.get(`https://${api}/api/pages/physical_printer/read.php`);
}
