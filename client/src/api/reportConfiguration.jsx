import axios from 'axios';

export function readConfiguration() {
  return axios.get(`/api/pages/report_config/read.php`);
}

export function readCompany() {
  return axios.get(`/api/pages/report_config/companys.php`);
}

export function readReports() {
  return axios.get(`/api/pages/report_config/reports.php`);
}

export function createConfiguration(payload) {
  return axios.post(`/api/pages/report_config/create.php`, payload);
}

export function updateConfiguration(payload) {
  return axios.post(`/api/pages/report_config/update.php`, payload);
}

export function deleteConfiguration(payload) {
  return axios.post(`/api/pages/report_config/delete.php`, payload);
}
